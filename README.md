# BNB JKT

HIRADC (Hazard Identification, Risk Assessment, and Determining Control) dengan fitur AI recommendation menggunakan Google Gemini.


## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 19 + Inertia.js v2
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Authentication**: Laravel Fortify
- **Testing**: Pest PHP
- **AI**: Google Gemini

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

