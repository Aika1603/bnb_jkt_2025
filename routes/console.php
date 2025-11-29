<?php

use Gemini\Data\Content;
use Gemini\Laravel\Facades\Gemini;
use Gemini\Data\GenerationConfig;
use Gemini\Data\Schema;
use Gemini\Enums\DataType;
use Gemini\Enums\ResponseMimeType;

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('chat:gemini-hse-indo', function () {
    // 1. Ambil data
    $hiarcs = \App\Models\Hiarc::with('potentialDangers')
        ->limit(20)
        ->get()
        ->toJson();

    // 2. System Instruction dalam Bahasa Indonesia yang Profesional
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
    "recommendation": "Rekomendasi berdasarkan ringkasan dari seluruh object opportunity_for_improvement pada potential_danger. Rekomendasi boleh mengandung tag HTML sederhana. Jangan menambahkan penjelasan apapun diluar konteks yang terdapat pada opportunity_for_improvement."
}

LOGIKA SCORING (PENILAIAN):
- 3 (High): Jika terdeteksi bahaya katastropik (ledakan, paparan amonia, kebakaran) ATAU pengendalian tidak memadai, ATAU nilai risiko input >= 3.
- 2 (Medium): Jika bahaya moderat dan pengendalian cukup standar, ATAU nilai risiko input = 2.
- 1 (Low): Jika risiko kecil dan rutin, ATAU nilai risiko input = 1.
TEXT;

    // 3. Eksekusi
    $response = Gemini::generativeModel(model: 'gemini-2.0-flash')
        ->withSystemInstruction(Content::parse($systemInstruction))
        ->withGenerationConfig(
            generationConfig: new GenerationConfig(
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
            "Analisis data HIRADC berikut dan berikan laporan evaluasinya:\n\n" . $hiarcs
        );

    // 4. Tampilkan Hasil
    $this->info("Raw Response:");
    $this->line($response->text());

    // Test Decode
    $result = json_decode($response->text());
    if ($result) {
        $this->info("\n--- Hasil Analisis ---");
        $this->info("Scoring Akhir : " . $result->scoring);
        $this->info("Ringkasan     : " . $result->summary);
    }
})->purpose('Contoh Analisis HSE dengan Bahasa Indonesia');

