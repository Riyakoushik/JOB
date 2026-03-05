# Job Hunter Pro

Personal job hunting dashboard for Thalari Koushik. A 100% free, static frontend application built to run on Cloudflare Pages.

## ✨ Features
- **Job Discovery**: Aggregates from 10+ sources (Arbeitnow, Remotive, JSearch, Adzuna, etc.).
- **Application Tracker**: Full-stack persistence using Cloudflare D1 (SQLite) + Workers.
- **HR Finder**: Managed via local data and LinkedIn outreach helpers.
- **ATS Scoring**: Built-in scoring algorithm for job matches and resume optimization.
- **Premium Design**: Dark mode, glassmorphism, and smooth animations.

## 🛠️ Tech Stack
- **React 19** + **Vite 7**
- **Cloudflare D1** (Database)
- **Cloudflare Workers** (API Layer)
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
   - `VITE_WORKER_URL`: Your deployed Worker URL.
   - `VITE_JSEARCH_API_KEY`: Your RapidAPI JSearch Key.
   - `VITE_ADZUNA_APP_ID`: Your Adzuna App ID.
   - `VITE_ADZUNA_APP_KEY`: Your Adzuna App Key.

3. **Routing**:
   The `public/_redirects` file ensures SPA routing works correctly on Cloudflare.

## 💻 Local Development
```bash
npm install
npm run dev
```
