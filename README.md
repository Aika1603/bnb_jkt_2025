# 🛡️ AI-Powered HIRADC Analyzer

![Project Status](https://img.shields.io/badge/Status-Development-yellow)

![Tech Stack](https://img.shields.io/badge/Stack-Laravel%20%7C%20React%20%7C%20Gemini-blue)

![Focus](https://img.shields.io/badge/Focus-HSE%20Risk%20Assessment-red)

# Source Code

https://github.com/yourusername/bnb-jkt

> This repository contains an intelligent HIRADC (Hazard Identification, Risk Assessment, and Determining Control) analysis system powered by Google Gemini AI.

## 📖 About The Project

**AI-Powered HIRADC Analyzer** is a web application designed to assist HSE (Health, Safety, and Environment) Engineers in conducting comprehensive risk assessments. Instead of manually reviewing hundreds of spreadsheet rows to determine whether a factory area is high risk, users can upload their structured HIRADC data and receive intelligent analysis powered by **Google Gemini 2.0 Flash**.

The system transforms traditional, time-consuming risk assessment workflows into an automated, AI-driven process that provides actionable insights and recommendations for improving workplace safety.

### 🌟 Key Features

* **📊 Automated Executive Summary**: AI-generated concise text explaining the facility's overall safety condition based on analyzed HIRADC data.

* **🎯 Consolidated Risk Score**: Calculated metric (High/Medium/Low) based on the severity of hazards found in the data, providing quick risk overview.

* **💡 Actionable Recommendations**: AI-generated suggestions to improve existing controls (such as recommending Engineering Controls instead of just Administrative Controls).

* **📈 Analytics Dashboard**: Interactive visualization of risk assessment results with detailed breakdowns and trends.

* **🔄 Data Processing**: Support for structured data ingestion (CSV/JSON) with automated parsing and validation.

## 🏗️ Tech Stack

* **Framework**: [Laravel 12](https://laravel.com/) (PHP 8.2)

* **Frontend**: [React 19](https://react.dev/) via [Inertia.js v2](https://inertiajs.com/)

* **AI Platform**: [Google Gemini API](https://ai.google.dev/)

* **Model**: Gemini 2.0 Flash

* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)

* **Database**: MySQL / MariaDB

* **ORM**: Eloquent ORM

## ⚙️ Architecture & Workflow

1. **Data Ingestion**: Users upload a dataset (CSV/JSON) containing columns such as Potential Hazard, Current Controls, and Risk Score through the React frontend. Alternatively, data can be seeded directly into the database for testing purposes.

2. **Data Processing**: The Laravel backend receives and validates the structured HIRADC data, ensuring all required fields are present and properly formatted.

3. **AI Processing Core**: 
   * The backend prepares a context-aware prompt with the HIRADC data.
   * The prompt is sent to the Gemini 2.0 Flash model via the Gemini API.
   * The AI analyzes the hazards, current controls, and risk scores.

4. **Analysis Generation**:
   * Gemini generates an executive summary of the facility's safety condition.
   * A consolidated risk score is calculated based on the severity of identified hazards.
   * Actionable recommendations are provided to improve existing controls.

5. **Response Parsing**: The structured JSON response from Gemini is parsed and validated by the Laravel backend.

6. **Dashboard Rendering**: The analysis results are rendered in the React frontend, displaying summaries, risk scores, and recommendations in an interactive dashboard.

7. **Data Persistence**: Analysis results are stored in the database for historical tracking and future reference.

