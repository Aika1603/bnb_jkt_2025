# Simple AI-Powered HIRADC Analyzer with Laravel and Gemini

HIRADC (Hazard Identification, Risk Assessment, and Determining Control) with AI recommendation features powered by Google Gemini.

## What is the Project?

This application acts as an “intelligent assistant” for HSE Engineers. Instead of manually reviewing hundreds of spreadsheet rows to determine whether a factory area is high risk, users simply upload their structured HIRADC data.

The system will process the data and provide:

- **Automated Executive Summary**: A concise text explaining the facility’s overall safety condition.
- **Consolidated Risk Score**: A calculated metric (High/Medium/Low) based on the severity of hazards found in the data.
- **Actionable Recommendations**: AI-generated suggestions to improve existing controls (such as recommending Engineering Controls instead of just Administrative Controls).

## Tech Stack

To build this solution, I use a modern architecture combining the robustness of PHP with the reactivity of a Single Page Application (SPA).

- **Backend**: Laravel 11 (PHP)
- **Frontend**: React.js (via Inertia.js)
- **Database**: MySQL / MariaDB
- **AI Model**: Google Gemini 2.0 Flash (via Gemini API)
- **Styling**: Tailwind CSS / Shadcn UI

## High-Level Design Architecture

The system architecture follows an efficient Input-Process-Output flow:

1. **Data Ingestion**: Users upload a dataset (CSV/JSON) containing columns such as Potential Hazard, Current Controls, and Risk Score through the React frontend (for this case, we use a seeder as the dataset).
2. **AI Processing Core**: The Laravel backend receives this data, prepares a context-aware prompt, and sends it to the Gemini model.
3. **Analytics Dashboard**: The structured JSON response from Gemini is parsed and rendered back to the user, displaying analysis summaries and improvement recommendations.


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

