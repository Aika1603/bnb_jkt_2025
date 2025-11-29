<?php

namespace Database\Seeders;

use App\Models\Hiarc;
use App\Models\PotentialDanger;
use Illuminate\Database\Seeder;

class HiarcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bersihkan data lama
        Hiarc::truncate();
        PotentialDanger::truncate();

        $hiarcs = [
            [
                'code' => 'HIRADC-A1',
                'activity' => 'Maintenance mesin produksi',
                'work_unit' => 'Teknik',
                'location' => 'Workshop A',
            ],
            [
                'code' => 'HIRADC-A2',
                'activity' => 'Inspeksi jaringan listrik',
                'work_unit' => 'Kelistrikan',
                'location' => 'Gudang B',
            ],
            [
                'code' => 'HIRADC-A3',
                'activity' => 'Pengangkutan bahan kimia',
                'work_unit' => 'Logistik',
                'location' => 'Area penyimpanan kimia',
            ],
            [
                'code' => 'HIRADC-A4',
                'activity' => 'Pembersihan area kerja',
                'work_unit' => 'Housekeeping',
                'location' => 'Fasilitas produksi utama',
            ],
        ];

        foreach ($hiarcs as $hiarc) {
            $hiarcModel = Hiarc::create([
                'code' => $hiarc['code'],
                'activity' => $hiarc['activity'],
                'work_unit' => $hiarc['work_unit'],
                'location' => $hiarc['location'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Seeder PotentialDanger dengan Oportunity yang memiliki pola mirip
            $potentialDangers = match ($hiarc['code']) {
                'HIRADC-A1' => [
                    [
                        'description' => 'Terjepit mesin bergerak',
                        'factors' => 'Kurang kehati-hatian, alat pelindung tidak digunakan',
                        'impact' => 'Cedera serius seperti putus jari atau patah tulang',
                        'current_controls' => 'APD wajib, pelatihan K3, SOP kerja aman',
                        'risk_score' => 3,
                        // Pola: Pengawasan
                        'opportunity_for_improvement' => 'Peningkatan pengawasan dan inspeksi rutin oleh supervisor',
                    ],
                    [
                        'description' => 'Tersengat listrik mesin',
                        'factors' => 'Kabel terkelupas, panel terbuka',
                        'impact' => 'Syok listrik, luka bakar',
                        'current_controls' => 'Pengecekan kabel berkala, SOP lockout-tagout',
                        'risk_score' => 2,
                        // Pola: Rambu/Label
                        'opportunity_for_improvement' => 'Pemasangan rambu peringatan bahaya listrik yang lebih jelas',
                    ],
                    [
                        'description' => 'Kebakaran akibat oli bocor',
                        'factors' => 'Perawatan kurang, kebocoran tidak terdeteksi cepat',
                        'impact' => 'Kebakaran, kerusakan mesin',
                        'current_controls' => 'Pemeriksaan visual rutin, APAR tersedia',
                        'risk_score' => 3,
                        // Pola: Sosialisasi/SOP
                        'opportunity_for_improvement' => 'Sosialisasi ulang prosedur penanganan kebocoran dan SOP',
                    ],
                    [
                        'description' => 'Terluka oleh alat tajam',
                        'factors' => 'Penyimpanan alat kurang aman, tidak ada kotak P3K terdekat',
                        'impact' => 'Luka terbuka, infeksi',
                        'current_controls' => 'Instruksi penyimpanan alat & APD sarung tangan',
                        'risk_score' => 1,
                        // Pola: APD
                        'opportunity_for_improvement' => '', // kosong jika risk_score == 1
                    ],
                ],
                'HIRADC-A2' => [
                    [
                        'description' => 'Kesetrum saat inspeksi',
                        'factors' => 'Tidak memadamkan arus, tidak menggunakan insulated tools',
                        'impact' => 'Cedera ringan sampai fatal',
                        'current_controls' => 'Checklist pemadaman arus, alat insulated',
                        'risk_score' => 3,
                        // Pola: Sosialisasi/SOP (Mirip dengan A1)
                        'opportunity_for_improvement' => 'Sosialisasi ulang prosedur kerja aman listrik (LOTO)',
                    ],
                    [
                        'description' => 'Jatuh dari ketinggian',
                        'factors' => 'Inspeksi di panel tinggi tanpa pengaman',
                        'impact' => 'Patah tulang atau kematian',
                        'current_controls' => 'Pemakaian sabuk pengaman, tangga standar',
                        'risk_score' => 2,
                        // Pola: APD (Mirip dengan A1)
                        'opportunity_for_improvement' => 'Penyediaan dan pengecekan kelayakan APD ketinggian',
                    ],
                    [
                        'description' => 'Terpapar asap solder',
                        'factors' => 'Ventilasi ruangan kurang',
                        'impact' => 'Gangguan pernapasan ringan',
                        'current_controls' => 'Exhaust fan, masker',
                        'risk_score' => 1,
                        // Pola: APD (Mirip dengan A1)
                        'opportunity_for_improvement' => '', // kosong jika risk_score == 1
                    ],
                    [
                        'description' => 'Luka bakar kontak listrik',
                        'factors' => 'Peralatan rusak, area basah saat inspeksi',
                        'impact' => 'Luka bakar ringan',
                        'current_controls' => 'Inspeksi alat sebelum digunakan, tanda larangan area basah',
                        'risk_score' => 2,
                        // Pola: Rambu/Label (Mirip dengan A1)
                        'opportunity_for_improvement' => 'Pemasangan rambu peringatan area berbahaya',
                    ],
                ],
                'HIRADC-A3' => [
                    [
                        'description' => 'Tumpahan bahan kimia',
                        'factors' => 'Pengangkutan tidak hati-hati, wadah bocor',
                        'impact' => 'Kontaminasi lingkungan, luka bakar kimia',
                        'current_controls' => 'APD sarung tangan, pelatihan penanganan tumpahan',
                        'risk_score' => 3,
                        // Pola: Pengawasan (Mirip dengan A1)
                        'opportunity_for_improvement' => 'Peningkatan pengawasan saat proses pengangkutan bahan',
                    ],
                    [
                        'description' => 'Terhirup uap bahan kimia',
                        'factors' => 'Pengemasan tidak rapat, ventilasi buruk',
                        'impact' => 'Keracunan ringan-sedang',
                        'current_controls' => 'Masker respirator, SOP pengangkutan tertutup',
                        'risk_score' => 2,
                        // Pola: APD (Mirip dengan A1)
                        'opportunity_for_improvement' => 'Penyediaan dan pengecekan kelayakan APD respirator',
                    ],
                    [
                        'description' => 'Reaksi kimia tidak disengaja',
                        'factors' => 'Bahan kimia tercampur, info label hilang',
                        'impact' => 'Ledakan kecil, asap beracun',
                        'current_controls' => 'Labelisasi bahan & segregasi penyimpanan',
                        'risk_score' => 2,
                        // Pola: Rambu/Label (Mirip dengan A1)
                        'opportunity_for_improvement' => 'Pemasangan label dan simbol bahaya yang jelas pada wadah',
                    ],
                    [
                        'description' => 'Terluka saat membawa beban berat',
                        'factors' => 'Teknik angkat beban salah, APD tidak digunakan',
                        'impact' => 'Terkilir, cedera otot',
                        'current_controls' => 'Pelatihan manual handling, sarung tangan & sepatu safety',
                        'risk_score' => 1,
                        // Pola: Sosialisasi/SOP (Mirip dengan A1)
                        'opportunity_for_improvement' => '', // kosong jika risk_score == 1
                    ],
                ],
                'HIRADC-A4' => [
                    [
                        'description' => 'Tergelincir lantai basah',
                        'factors' => 'Tidak ada tanda peringatan lantai basah',
                        'impact' => 'Memar, patah tulang',
                        'current_controls' => 'Pemasangan tanda basah sementara',
                        'risk_score' => 2,
                        // Pola: Rambu/Label
                        'opportunity_for_improvement' => 'Pemasangan rambu peringatan lantai basah permanen',
                    ],
                    [
                        'description' => 'Paparan bahan kimia pembersih',
                        'factors' => 'APD tidak lengkap, alat bocor',
                        'impact' => 'Iritasi kulit/mata',
                        'current_controls' => 'APD kacamata & sarung tangan',
                        'risk_score' => 1,
                        // Pola: APD
                        'opportunity_for_improvement' => '', // kosong jika risk_score == 1
                    ],
                    [
                        'description' => 'Cedera ergonomis',
                        'factors' => 'Posisi kerja tidak ergonomis, penggunaan alat tidak tepat',
                        'impact' => 'Sakit punggung, cidera otot',
                        'current_controls' => 'Pelatihan postur kerja ergonomis',
                        'risk_score' => 1,
                        // Pola: Sosialisasi/SOP
                        'opportunity_for_improvement' => '', // kosong jika risk_score == 1
                    ],
                    [
                        'description' => 'Tersandung kabel/alat',
                        'factors' => 'Penyimpanan alat sembarangan',
                        'impact' => 'Luka ringan atau berat',
                        'current_controls' => 'Penyusunan alat sistematis, garis kuning jalur alat',
                        'risk_score' => 2,
                        // Pola: Pengawasan
                        'opportunity_for_improvement' => 'Peningkatan pengawasan kerapian area kerja (5R)',
                    ],
                ],
                default => [],
            };

            foreach ($potentialDangers as $danger) {
                PotentialDanger::create([
                    'hiarc_id' => $hiarcModel->id,
                    'description' => $danger['description'],
                    'factors' => $danger['factors'],
                    'impact' => $danger['impact'],
                    'current_controls' => $danger['current_controls'],
                    'risk_score' => $danger['risk_score'],
                    'opportunity_for_improvement' => $danger['opportunity_for_improvement'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
