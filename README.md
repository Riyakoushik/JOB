# Job Hunter Pro

Personal job hunting dashboard for Thalari Koushik. A 100% free, static frontend application built to run on Cloudflare Pages.

## ✨ Features
- **Job Discovery**: Fetches from Arbeitnow and Remotive free APIs.
- **Application Tracker**: Syncs with Google Sheets (API v4).
- **HR Finder**: Managed via local data.
- **ATS Scoring**: Built-in scoring algorithm for job matches.
- **Premium Design**: Dark mode, glassmorphism, and smooth animations.

## 🛠️ Tech Stack
- **React 19** + **Vite 7**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Radix UI** primitives

## 🚀 Deployment (Cloudflare Pages)

1. **Build Settings**:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`

2. **Environment Variables**:
   Set these in the Cloudflare Pages dashboard:
   - `VITE_GOOGLE_SHEETS_ID`: Your Google Sheet ID.
   - `VITE_GOOGLE_API_KEY`: Your Google Cloud API Key (with Sheets API enabled).

3. **Routing**:
   The `public/_redirects` file ensures SPA routing works correctly on Cloudflare.

## 💻 Local Development
```bash
npm install
npm run dev
```
