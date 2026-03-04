# 🔑 Job Hunter Pro — API Setup Guide

This guide explains how to obtain the API keys required to power the **Discover** and **Tracker** sections of Job Hunter Pro.

## 1. Google Sheets API (for Job Tracker)
Used to save and sync your job applications to a personal Google Sheet.

1.  **Go to Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com/)
2.  **Create a Project**: Click "Select a project" > "New Project" > Name it `JobHunterPro`.
3.  **Enable Sheets API**:
    - Go to **APIs & Services** > **Library**.
    - Search for "Google Sheets API" and click **Enable**.
4.  **Create API Key**:
    - Go to **APIs & Services** > **Credentials**.
    - Click **+ Create Credentials** > **API Key**.
    - Copy this to `VITE_GOOGLE_API_KEY`.
5.  **Get Sheet ID**:
    - Create a new Google Sheet.
    - Setup columns in Row 1: `id`, `title`, `company`, `date`, `status`, `match`, `notes`.
    - Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/[THIS_PART_IS_YOUR_ID]/edit`.
    - Copy this to `VITE_GOOGLE_SHEETS_ID`.
6.  **Share the Sheet**: Click **Share** and set "General Access" to "Anyone with the link can view" (or add your service account if using one, but for a private API key, the sheet must be accessible).

---

## 2. JSearch API (for LinkedIn/Naukri/Indeed)
Used to fetch high-quality India-specific jobs and major board listings via RapidAPI.

1.  **Register on RapidAPI**: [rapidapi.com](https://rapidapi.com/signup)
2.  **Go to JSearch API**: [rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch/)
3.  **Subscribe**: Choose the **Free Plan** (60 requests/day).
4.  **Copy API Key**: 
    - In the API Playground, find the `X-RapidAPI-Key` header.
    - Copy this to `VITE_JSEARCH_API_KEY`.

---

## 3. Adzuna API (for India Search)
Used for additional job search coverage in the India region.

1.  **Register at Adzuna Developers**: [developer.adzuna.com](https://developer.adzuna.com/)
2.  **Create an App**: Once logged in, go to the dashboard and create a new application.
3.  **Get IDs**: 
    - Copy the **Application ID** to `VITE_ADZUNA_APP_ID`.
    - Copy the **Application Key** to `VITE_ADZUNA_APP_KEY`.

---

## 📝 How to set up your `.env` file

1.  Create a file named `.env` in the project root (same level as `package.json`).
2.  Paste the following and replace the placeholders:

```env
VITE_GOOGLE_SHEETS_ID=your_id_here
VITE_GOOGLE_API_KEY=your_key_here
VITE_JSEARCH_API_KEY=your_rapidapi_key_here
VITE_ADZUNA_APP_ID=your_adzuna_id_here
VITE_ADZUNA_APP_KEY=your_adzuna_key_here
```

3.  Restart your dev server (`npm run dev`) for the changes to take effect.
