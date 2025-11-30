# BNB JKT

HIRADC (Hazard Identification, Risk Assessment, and Determining Control) dengan fitur AI recommendation menggunakan Google Gemini.

## What is the Project?

Aplikasi ini berfungsi sebagai “asisten cerdas” bagi Engineer HSE. Daripada membaca ratusan baris spreadsheet secara manual untuk menentukan apakah suatu area pabrik berisiko tinggi, pengguna cukup mengunggah data HIRADC mereka yang sudah terstruktur.

Sistem akan memproses data tersebut dan memberikan:

- **Automated Executive Summary**: Teks ringkas yang menjelaskan kondisi keselamatan fasilitas secara keseluruhan.
- **Consolidated Risk Score**: Metrik terhitung (High/Medium/Low) berdasarkan tingkat keparahan bahaya yang ditemukan dalam data.
- **Actionable Recommendations**: Saran yang dihasilkan AI untuk meningkatkan kontrol yang ada (misalnya, menyarankan Engineering Controls daripada sekadar Administrative Controls).

## Tech Stack

Untuk membangun solusi ini, saya menggunakan arsitektur modern yang menggabungkan ketangguhan PHP dengan reaktivitas Single Page Application (SPA).

- **Backend**: Laravel 11 (PHP)
- **Frontend**: React.js (via Inertia.js)
- **Database**: MySQL / MariaDB
- **AI Model**: Google Gemini 2.0 Flash (via Gemini API)
- **Styling**: Tailwind CSS / Shadcn UI

## High-Level Design

Arsitektur sistem mengikuti alur Input-Proses-Output yang efisien:

1. **Data Ingestion**: Pengguna mengunggah dataset (CSV/JSON) yang berisi kolom seperti Potential Hazard, Current Controls, dan Risk Score melalui frontend React (Untuk case ini kita menggunakan seeder sebagai datasets).
2. **AI Processing Core**: Backend Laravel menerima data ini, menyusun prompt yang sadar konteks (context-aware), dan mengirimkannya ke model Gemini.
3. **Analytics Dashboard**: Respons JSON terstruktur dari Gemini diuraikan (parsed) dan dirender kembali ke pengguna, menampilkan ringkasan analisis dan rekomendasi perbaikan.


## Requirements

- PHP 8.2+
- Composer
- Node.js & pnpm
- SQLite (default) atau database lainnya

## Installation

1. Clone repository
```bash
git clone <repository-url>
cd bnb-jkt
```

2. Install dependencies
```bash
composer install
pnpm install
```

3. Setup environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Setup database
```bash
php artisan migrate
php artisan db:seed
```

5. Build assets
```bash
pnpm run build
```

## Development

Jalankan development server:

```bash
composer run dev
```

Command ini akan menjalankan:
- Laravel server
- Queue worker
- Pail (log viewer)
- Vite dev server

## Testing

Jalankan semua tests:

```bash
php artisan test
```

## Scripts

### Composer Scripts
- `composer run dev` - Jalankan development server
- `composer run test` - Jalankan tests
- `composer run setup` - Setup project dari awal

### NPM Scripts
- `pnpm run dev` - Jalankan Vite dev server
- `pnpm run build` - Build production assets
- `pnpm run lint` - Lint JavaScript/TypeScript
- `pnpm run format` - Format code dengan Prettier


- **JavaScript/TypeScript**: Format dengan Prettier
```bash
pnpm run format
```

## License

MIT

