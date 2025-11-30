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


