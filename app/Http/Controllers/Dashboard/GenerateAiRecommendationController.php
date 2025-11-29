<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Hiarc;
use Gemini\Data\Content;
use Gemini\Data\GenerationConfig;
use Gemini\Data\Schema;
use Gemini\Enums\DataType;
use Gemini\Enums\ResponseMimeType;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GenerateAiRecommendationController extends Controller
{
    public function generate(Request $request): JsonResponse
    {
        try {
            $hiarcs = Hiarc::with('potentialDangers')
                ->limit(20)
                ->get();

            if ($hiarcs->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No HIRADC data available for analysis.',
                ], 422);
            }

            // Data JSON untuk AI, original tidak diubah
            $hiarcsJson = $hiarcs->toJson();

            // System Instruction dalam Bahasa Indonesia (dengan skenario K3 Petrokimia)
            $systemInstruction = <<<TEXT
PERAN:
Anda adalah Auditor Senior K3 (Kesehatan dan Keselamatan Kerja) dan Safety Engineer yang berspesialisasi dalam industri Pupuk dan Petrokimia.

KONTEKS:
Anda sedang meninjau data HIRADC (Hazard Identification, Risk Assessment, and Determining Control). Fasilitas ini menangani bahan kimia berbahaya (seperti Amonia, Urea, NPK, Gas CO2), proses sintesis bertekanan tinggi, dan peralatan mekanis berat (conveyor, granulator).

TUGAS ANDA:
1. Analisis data JSON yang diberikan (Bahaya Potensial vs Pengendalian).
2. Evaluasi kecukupan pengendalian risiko berdasarkan "Hirarki Pengendalian Bahaya" (Eliminasi, Substitusi, Rekayasa Teknik, Administratif, APD).
3. Kritik jika pengendalian hanya mengandalkan APD untuk risiko tinggi (seperti kebocoran gas beracun).
4. Susun rekomendasi yang relevan berdasarkan semua poin "opportunity_for_improvement" pada setiap potential_danger. Jika tidak ada "opportunity_for_improvement" sama sekali, cukup tampilkan info bahwa rekomendasi tidak tersedia.
5. <b>Penting:</b> Rekomendasi <b>boleh</b> memuat tag <b>HTML sederhana</b> seperti <code>&lt;ul&gt;</code>, <code>&lt;li&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;strong&gt;</code>, dan <code>&lt;em&gt;</code>, jika dibutuhkan untuk menjelaskan atau memperjelas isi rekomendasi.

ATURAN OUTPUT (FORMAT JSON):
Anda wajib memberikan respons HANYA dalam format JSON:
{
    "summary": "Ringkasan eksekutif (maks 100 kata) tentang postur keselamatan dari data ini. Gunakan bahasa Indonesia formal.",
    "scoring": 3 | 2 | 1,
    "recommendation": "Rekomendasi berdasarkan ringkasan dari seluruh object opportunity_for_improvement pada potential_danger. Rekomendasi boleh mengandung tag HTML sederhana. Jangan menambahkan penjelasan apapun diluar konteks yang terdapat pada opportunity_for_improvement. Maksimal hanya menampilkan 5 poin rekomendasi utama."
}

LOGIKA SCORING (PENILAIAN):
- 3 (High): Jika terdeteksi bahaya katastropik (ledakan, paparan amonia, kebakaran) ATAU pengendalian tidak memadai, ATAU nilai risiko input >= 3.
- 2 (Medium): Jika bahaya moderat dan pengendalian cukup standar, ATAU nilai risiko input = 2.
- 1 (Low): Jika risiko kecil dan rutin, ATAU nilai risiko input = 1.
TEXT;

            // Eksekusi Gemini
            $response = Gemini::generativeModel(model: 'gemini-2.5-flash')
                ->withSystemInstruction(Content::parse($systemInstruction))
                ->withGenerationConfig(
                    new GenerationConfig(
                        responseMimeType: ResponseMimeType::APPLICATION_JSON,
                        responseSchema: new Schema(
                            type: DataType::OBJECT,
                            properties: [
                                'summary' => new Schema(type: DataType::STRING),
                                'scoring' => new Schema(type: DataType::INTEGER),
                                'recommendation' => new Schema(type: DataType::STRING)
                            ],
                            required: ['summary', 'scoring', 'recommendation'],
                        )
                    )
                )
                ->generateContent(
                    "Analisis data HIRADC berikut dan berikan laporan evaluasinya:\n\n" . $hiarcsJson
                );

            $aiJson = json_decode($response->text(), true);

            return response()->json([
                'success' => true,
                'summary' => $aiJson['summary'] ?? null,
                'scoring' => $aiJson['scoring'],
                'recommendation' => $aiJson['recommendation'] ?? null,
                'raw_response' => $response->text(),
            ]);
        } catch (\Exception $e) {
            Log::error('AI Generation Error: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate AI recommendations. Please try again later.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}
