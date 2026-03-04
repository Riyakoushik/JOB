---
name: job-hunter-pro
description: Personal job search app for Thalari Koushik. Use this skill whenever making ANY changes to this project — refactoring, adding features, fixing bugs, or migrating code. Contains the full project architecture, file map, rules, and constraints.
---

# Job Hunter Pro — Project Skill

## Who This App Is For
- **Owner**: Thalari Koushik (solo, personal use only)
- **Goal**: Personal job hunting dashboard — discover jobs, track applications, manage HR contacts
- **Target Deploy**: Cloudflare Pages (free tier, static hosting only)
- **Constraint**: NO backend, NO server, NO paid services — 100% free forever

---

## Tech Stack
- **React 19** + **Vite 7**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Radix UI** primitives (`@radix-ui/react-*`)
- **lucide-react** for icons
- **class-variance-authority** + **clsx** + **tailwind-merge** for styling utils

---

## Project File Map

```
src/
├── App.jsx                        # Root layout, tab routing, global state
├── main.jsx                       # React entry point
├── index.css                      # Global styles + Tailwind base
├── data/
│   └── constants.js               # USER_PROFILE, MOCK_JOBS, MOCK_HRS, ROLE_GROUPS,
│                                  # BLOCKED_KEYWORDS, EMAIL_TEMPLATES, COMPANIES
├── hooks/
│   └── useHooks.js                # useLocalStorage, useDarkMode, useDebounce
├── lib/
│   ├── ats.js                     # calcATSScore(), detectRoleGroup() — runs in browser
│   └── utils.js                   # cn() utility (clsx + tailwind-merge)
└── components/
    ├── ui.jsx                     # All shared UI: Button, Card, Badge, Input,
    │                              # Toast, Avatar, Separator, MatchScoreCircle, StatItem
    ├── JobSearchTab.jsx           # Job discovery — fetches from free APIs
    ├── ApplicationsTab.jsx        # Job application tracker — Google Sheets backend
    ├── HRContactsTab.jsx          # HR contacts manager — localStorage + MOCK_HRS
    ├── LinkedInFinderTab.jsx      # LinkedIn outreach helper
    ├── ResumeTab.jsx              # Resume notes manager
    ├── MyProfileTab.jsx           # User profile viewer
    └── AdminPanelTab.jsx          # Manual job refresh + status panel
```

---

## User Profile (from constants.js)
```js
USER_PROFILE = {
  name: "Thalari Koushik",
  title: "Aspiring Associate Product Manager (APM)",
  email: "tkjs.koushik@gmail.com",
  location: "Kurnool, Andhra Pradesh (Remote Only)",
  resumeSkills: ["Agile", "Scrum", "PRD Writing", "OKRs", "RICE Framework", ...],
  targetRoles: ["APM", "Associate Product Manager", "Product Analyst", ...],
  blockedKeywords: ["BPO", "Sales", "Telecaller", "Customer Support", ...]
}
```

---

## Architecture Rules — NEVER VIOLATE THESE

### ✅ Allowed
- React state (`useState`, `useReducer`)
- `localStorage` via `useLocalStorage` hook (for saved jobs, resume, HR contacts)
- Google Sheets API v4 (for ApplicationsTab persistent tracking)
- Free public APIs with no API key (Arbeitnow, Remotive)
- Environment variables via `import.meta.env.VITE_*`
- Browser-side ATS scoring via `calcATSScore()` in `lib/ats.js`

### ❌ Never Allowed
- No Express, Node.js, or any backend server
- No Puppeteer, Cheerio, or web scraping
- No `node-cron` or any server-side scheduled jobs
- No SQLite, Prisma, or any server-side database
- No paid APIs or services requiring a credit card
- No `localStorage` or `sessionStorage` inside artifacts
- No `server/` folder — it must stay deleted

---

## Job Data Sources (Free, No API Key)

### Primary — Arbeitnow
```js
const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
const { data } = await res.json();
// Each job: { title, company_name, location, tags, url, created_at, remote }
```

### Secondary — Remotive
```js
const res = await fetch('https://remotive.com/api/remote-jobs');
const { jobs } = await res.json();
// Each job: { title, company_name, tags, url, publication_date, candidate_required_location }
```

### Fallback
- Use `MOCK_JOBS` from `constants.js` if both APIs fail
- Always filter results using `BLOCKED_KEYWORDS` from `constants.js`
- Always run `calcATSScore(job.skills, job.title)` on each job before display

---

## Cloudflare D1 + Workers Integration (ApplicationsTab)

### Purpose
Persist job applications across all devices/browsers using Cloudflare D1 (free SQLite database) + a Cloudflare Worker (free serverless REST API).

### Architecture
```
React Frontend (Cloudflare Pages)
        ↓ fetch()
Cloudflare Worker (worker/ folder — REST API)
        ↓ env.DB
Cloudflare D1 (SQLite Database — free, 5GB)
```

### Environment Variables
```
VITE_WORKER_URL=https://job-hunter-worker.YOUR_SUBDOMAIN.workers.dev
```

### Worker Folder Structure
```
worker/
├── package.json
├── wrangler.toml        ← contains D1 database_id
└── src/
    ├── index.js         ← REST API (6 endpoints)
    └── schema.sql       ← D1 table definition
```

### D1 Table Schema
```sql
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Applied',
  match INTEGER DEFAULT 80,
  notes TEXT DEFAULT '',
  applyUrl TEXT DEFAULT '',
  source TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
```

### Worker API Endpoints
| Method | Endpoint | Action |
|--------|----------|--------|
| GET | /applications | Fetch all applications |
| POST | /applications | Save new application |
| PUT | /applications/:id | Update status/notes |
| DELETE | /applications/:id | Delete one application |
| DELETE | /applications | Clear all applications |
| GET | /health | Health check |

### Fallback
If `VITE_WORKER_URL` is not set, fall back to `localStorage` silently.

---

## Styling Rules

- **Dark mode only** — always `dark` class on `document.documentElement`
- **Color palette**: black backgrounds (`bg-black`, `bg-zinc-900`, `bg-zinc-950`), white/zinc text, blue accents (`blue-500`, `blue-600`)
- **Glassmorphism**: `backdrop-blur-xl bg-black/60 border border-white/10`
- **Animations**: `animate-fade-in`, `animate-fade-in-up`, `animate-pulse`, `animate-glow-blue`
- **Never** use white backgrounds or light mode styles
- All shared UI components live in `components/ui.jsx` — never duplicate them

---

## Tab Navigation (App.jsx)

| Tab ID | Component | Data Source |
|--------|-----------|-------------|
| `jobs` | `JobSearchTab` | Arbeitnow + Remotive APIs → MOCK_JOBS fallback |
| `linkedin` | `LinkedInFinderTab` | Static / localStorage |
| `hr` | `HRContactsTab` | MOCK_HRS + localStorage |
| `admin` | `AdminPanelTab` | Manual API refresh trigger |
| `resume` | `ResumeTab` | localStorage (`jh_resume_notes`) |
| `applications` | `ApplicationsTab` | Cloudflare D1 via Worker API → localStorage fallback |
| `profile` | `MyProfileTab` | USER_PROFILE from constants.js |

---

## Global State (App.jsx)

```js
const [savedJobs, setSavedJobs] = useLocalStorage('jh_saved_jobs', []);
const [savedNotes, setSavedNotes] = useLocalStorage('jh_resume_notes', []);
const [apps, setApps] = useLocalStorage('jh_applications', [...]);
```

Props passed down to tabs:
- `JobSearchTab`: `{ savedJobs, setSavedJobs, showToast }`
- `ApplicationsTab`: `{ apps, setApps, showToast }`
- `ResumeTab`: `{ savedNotes, setSavedNotes, showToast }`
- All tabs receive: `{ showToast }`

---

## Cloudflare Pages Deployment

### Required Files
```
public/_redirects
```
Content:
```
/* /index.html 200
```

### Build Settings (in Cloudflare dashboard)
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `18`

### Environment Variables (set in Cloudflare Pages dashboard)
```
VITE_WORKER_URL=https://job-hunter-worker.YOUR_SUBDOMAIN.workers.dev
VITE_JSEARCH_API_KEY=your_rapidapi_key_here
VITE_ADZUNA_APP_ID=your_adzuna_app_id_here
VITE_ADZUNA_APP_KEY=your_adzuna_app_key_here
```

---

## Component Patterns

### Adding a new feature
1. Check if a shared UI component exists in `ui.jsx` first
2. Use `useLocalStorage` hook for any persistent state
3. Keep all API calls inside `useEffect` with proper error handling
4. Always show a `showToast` message on success and error
5. Use `animate-fade-in` class on the top-level div of any new component

### Error handling pattern
```jsx
try {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed');
  const data = await res.json();
  // handle data
} catch (err) {
  showToast('Something went wrong', 'error');
}
```

### Loading state pattern
```jsx
{loading
  ? [1,2,3,4].map(i => <Card key={i} className="h-64 skeleton opacity-50" />)
  : items.map(item => <ItemCard key={item.id} {...item} />)
}
```

---

## What Was Removed (Do Not Re-add)
- `server/` folder — Express backend, Prisma, SQLite, scrapers, cron jobs
- `/api/jobs` endpoint → replaced by Arbeitnow + Remotive
- `/api/hr` and `/api/hr/scrape` → replaced by MOCK_HRS + localStorage
- `/api/admin/scrape` and `/api/admin/logs` → replaced by manual refresh button
- Puppeteer, Cheerio, RSS Parser, node-cron dependencies
