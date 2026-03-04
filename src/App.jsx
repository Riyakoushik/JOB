import { useState, useEffect, useCallback } from 'react';
import {
  Sun, Moon, Briefcase, Linkedin, Users, FileText, ClipboardList, User,
  Search, ExternalLink, Copy, Mail, Phone, Upload, Trash2, Edit3,
  CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Plus, X,
  Bookmark, BookmarkCheck, Globe, Building2, Flame, Award, TrendingUp,
  MapPin, Calendar, ArrowUpDown, Sparkles, Zap, Shield, Rocket, Eye, Link2, AlertCircle,
  BarChart3
} from 'lucide-react';

// ============================================================================
// SECTION 1: CONSTANTS & DATA MODELS
// ============================================================================

const USER_PROFILE = {
  name: "Thalari Koushik", title: "Aspiring Associate Product Manager (APM)",
  email: "tkjs.koushik@gmail.com", linkedin: "linkedin.com/in/tkoushik",
  website: "thalarikoushik.in", location: "Kurnool, Andhra Pradesh (Remote Only)",
  resumeSkills: [
    "Agile", "Scrum", "PRD Writing", "OKRs", "RICE Framework", "Kano Analysis", "User Research",
    "GTM Strategy", "Notion", "Google Analytics", "A/B Testing", "Roadmap Planning",
    "Stakeholder Management", "Design Thinking", "SQL", "Claude AI", "Manus AI",
    "Backlog Prioritization", "Sprint Planning", "User Stories", "KPI Tracking",
    "Funnel Analysis", "Data Visualization", "MECE Framework", "Competitive Intelligence",
    "UX Research", "User Personas", "Customer Journey Mapping", "NLP", "Web Scraping",
    "OpenAI APIs", "Python", "Figma", "Google Sheets", "PowerPoint", "MS Teams"
  ],
  certifications: ["McKinsey Forward Program 2025 – Product Strategy", "Product Management: Building a Product Strategy – LinkedIn Learning"],
  education: "BCA – Sunstone Bangalore – CGPA 8.56 – 2025",
  achievements: [
    "Selected from 10,000+ global applicants for McKinsey Forward", "Delivered 15+ executive presentations",
    "Built RIYA AI – emotionally intelligent AI companion", "Eliminated 80% manual research time via AI automation"
  ],
  targetRoles: ["APM", "Associate Product Manager", "Product Analyst", "Project Coordinator", "Product Intern", "PM Intern", "Business Analyst", "Growth Analyst", "Research Analyst"],
  blockedKeywords: ["BPO", "Sales", "Telecaller", "Customer Support", "Insurance", "Field Sales", "Voice Process", "Marketing Executive", "Collection", "Outbound"]
};

const ROLE_GROUPS = {
  "Product Track": { color: "blue", icon: "📦", keywords: ["associate product manager", "apm", "product intern", "product analyst", "product owner", "product operations", "product strategy intern", "product research", "product specialist", "junior product manager", "product coordinator", "ai product"] },
  "Project Track": { color: "purple", icon: "🏗️", keywords: ["project coordinator", "project manager", "program coordinator", "program manager", "scrum master intern", "delivery coordinator", "project analyst", "agile coordinator", "sprint coordinator", "it coordinator", "operations coordinator", "project intern"] },
  "Business & Strategy Track": { color: "indigo", icon: "📊", keywords: ["business analyst", "strategy analyst", "management consultant", "market research analyst", "business operations analyst", "competitive intelligence analyst", "strategy intern", "management trainee", "business research analyst", "corporate strategy", "business development analyst"] },
  "Data & Reporting Track": { color: "green", icon: "📈", keywords: ["data analyst", "reporting analyst", "bi analyst", "analytics intern", "data research analyst", "insights analyst", "dashboard analyst", "metrics analyst", "kpi analyst", "google analytics", "excel analyst", "data operations"] },
  "Research & UX Track": { color: "pink", icon: "🔬", keywords: ["ux researcher", "user researcher", "usability tester", "growth analyst", "growth research", "market analyst", "consumer research analyst", "design researcher", "product design researcher", "research analyst", "research intern"] },
  "Content & Docs Track": { color: "yellow", icon: "✍️", keywords: ["technical writer", "documentation specialist", "content strategist", "knowledge base manager", "product writer", "ux writer", "content analyst", "documentation analyst", "learning content", "technical content writer", "product documentation"] },
  "AI & Ops Track": { color: "orange", icon: "🤖", keywords: ["ai product researcher", "ai operations analyst", "prompt analyst", "ai research analyst", "ai strategy intern", "ml operations analyst", "ai product intern", "no-code analyst", "automation analyst", "ai coordinator", "llm researcher", "ai tools specialist"] },
  "Customer Success Track": { color: "teal", icon: "🤝", keywords: ["customer success manager", "customer success analyst", "client success intern", "account manager intern", "customer operations analyst", "onboarding specialist", "product success analyst", "implementation analyst"] }
};

const BLOCKED_KEYWORDS = [
  "bpo", "telecaller", "voice process", "inbound calls", "outbound calls", "call center", "customer care executive", "helpdesk executive", "technical support executive", "chat support", "email support agent",
  "sales executive", "sales representative", "field sales", "field executive", "inside sales", "cold calling", "lead generation executive", "business development executive", "bd executive", "sales associate",
  "insurance advisor", "insurance agent", "loan officer", "collection agent", "recovery agent", "financial advisor",
  "marketing executive", "social media executive", "seo executive", "digital marketing executive", "content writer"
];

const MOCK_JOBS = [
  { id: 'm1', title: 'APM Intern', company: 'NovaTech AI', location: 'Remote', salary: '₹10K/mo', skills: ['Agile', 'PRD', 'User Research', 'Notion'], applicantCount: 6, isEasyApply: true, source: 'Company Direct', postedHoursAgo: 2 },
  { id: 'm2', title: 'Data Analyst (Fresher)', company: 'LoopStack', location: 'Remote', salary: '₹18K/mo', skills: ['Google Analytics', 'Excel', 'A/B Testing', 'SQL'], applicantCount: 43, isVerified: true, source: 'LinkedIn', postedHoursAgo: 12 },
  { id: 'm3', title: 'Business Analyst Intern', company: 'BuildSpace', location: 'Remote', salary: '₹15K/mo', skills: ['SWOT Analysis', 'Excel', 'Stakeholder Mgmt', 'Scrum'], applicantCount: 8, isEasyApply: true, source: 'LinkedIn', postedHoursAgo: 5 },
  { id: 'm4', title: 'Project Coordinator', company: 'CloudNine', location: 'Remote', salary: '₹12K/mo', skills: ['Notion', 'Agile', 'Sprint Planning', 'MS Teams'], applicantCount: 15, source: 'Naukri', postedHoursAgo: 20 },
  { id: 'm5', title: 'UX Researcher Intern', company: 'Zeta Labs', location: 'Remote', salary: '₹12K/mo', skills: ['User Interviews', 'Personas', 'JTBD', 'Usability Testing'], applicantCount: 5, isVerified: true, source: 'Company Direct', postedHoursAgo: 1 },
  { id: 'm6', title: 'Technical Writer', company: 'DocuMind', location: 'Remote', salary: '₹3.5 LPA', skills: ['Technical Docs', 'Notion', 'Markdown', 'Product Knowledge'], applicantCount: 22, source: 'WeWorkRemotely', postedHoursAgo: 48 },
  { id: 'm7', title: 'AI Research Analyst', company: 'AIFirst', location: 'Remote', salary: '₹14K/mo', skills: ['LLMs', 'NLP', 'Manus AI', 'Claude AI', 'Research'], applicantCount: 9, isEasyApply: true, source: 'AngelList', postedHoursAgo: 4 },
  { id: 'm8', title: 'Customer Success Analyst', company: 'SaaSTech', location: 'Remote', salary: '₹16K/mo', skills: ['Onboarding', 'KPI Tracking', 'Google Sheets', 'Communication'], applicantCount: 11, source: 'LinkedIn', postedHoursAgo: 8 },
  { id: 'm9', title: 'Strategy Research Intern', company: 'GrowthLabs', location: 'Remote', salary: '₹10K/mo', skills: ['Market Research', 'Competitive Intel', 'GTM', 'MECE'], applicantCount: 7, isEasyApply: true, source: 'Company Direct', postedHoursAgo: 6 },
  { id: 'm10', title: 'Growth Analyst Intern', company: 'ScaleUp', location: 'Remote', salary: '₹12K/mo', skills: ['Funnel Analysis', 'Google Analytics', 'A/B Testing', 'OKRs'], applicantCount: 4, isVerified: true, source: 'Arbeitnow', postedHoursAgo: 15 },
];

const COMPANIES = [
  { name: 'Razorpay', url: 'https://razorpay.com/jobs/', ats: 'Greenhouse' },
  { name: 'Freshworks', url: 'https://www.freshworks.com/company/careers/', ats: 'Greenhouse' },
  { name: 'Zoho', url: 'https://www.zoho.com/careers.html', ats: 'Custom ATS' },
  { name: 'PhonePe', url: 'https://www.phonepe.com/careers/', ats: 'Lever' },
  { name: 'Swiggy', url: 'https://careers.swiggy.com/', ats: 'Custom ATS' },
  { name: 'Groww', url: 'https://groww.in/careers', ats: 'Lever' },
  { name: 'CRED', url: 'https://careers.cred.club/', ats: 'Greenhouse' },
  { name: 'Meesho', url: 'https://meesho.com/careers', ats: 'Lever' },
  { name: 'Notion', url: 'https://www.notion.so/careers', ats: 'Greenhouse' },
  { name: 'Linear', url: 'https://linear.app/careers', ats: 'Ashby' },
];

const MOCK_HRS = [
  { id: 'h1', name: 'Priya Sharma', company: 'Razorpay', designation: 'Talent Acquisition', email: 'priya.sharma@razorpay.com', phone: '+91-9876543210', linkedinUrl: 'https://linkedin.com/in/priyasharma', isVerified: true, avatarColor: '#3b82f6', roleHiring: 'Hiring APM Intern' },
  { id: 'h2', name: 'Arjun Mehta', company: 'Freshworks', designation: 'HR Manager', email: 'arjun.mehta@freshworks.com', phone: '+91-9123456789', linkedinUrl: 'https://linkedin.com/in/arjunmehta', isVerified: true, avatarColor: '#a855f7', roleHiring: 'Hiring Product Analyst' },
  { id: 'h3', name: 'Neha Reddy', company: 'Groww', designation: 'People Ops', email: 'neha.reddy@groww.in', phone: '', linkedinUrl: 'https://linkedin.com/in/nehareddy', isVerified: false, avatarColor: '#10b981', roleHiring: 'Hiring APM Fresher' },
];

// ============================================================================
// SECTION 2: HOOKS & UTILS
// ============================================================================

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : defaultValue; }
    catch { return defaultValue; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('jh_theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('jh_theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, setDark];
}

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => { const t = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return debounced;
}

function calcATSScore(jobSkills = [], jobTitle = '') {
  const normalize = s => s.toLowerCase().trim();
  const userNorm = USER_PROFILE.resumeSkills.map(normalize);
  const jobNorm = jobSkills.map(normalize);

  const exactMatches = jobNorm.filter(s => userNorm.includes(s));
  const partialMatches = jobNorm.filter(s => !exactMatches.includes(s) && userNorm.some(u => u.includes(s) || s.includes(u)));
  const missingSkills = jobNorm.filter(s => !exactMatches.includes(s) && !partialMatches.includes(s));

  const matchScore = exactMatches.length * 1.0 + partialMatches.length * 0.5;
  const maxScore = jobNorm.length || 1;
  const skillScore = Math.round((matchScore / maxScore) * 85); // 0-85 pts

  let roleBonus = 0;
  const title = jobTitle.toLowerCase();
  if (ROLE_GROUPS["Product Track"].keywords.some(k => title.includes(k))) roleBonus = 15;
  else if (ROLE_GROUPS["Project Track"].keywords.some(k => title.includes(k))) roleBonus = 14;
  else if (ROLE_GROUPS["Business & Strategy Track"].keywords.some(k => title.includes(k))) roleBonus = 13;
  else if (ROLE_GROUPS["Data & Reporting Track"].keywords.some(k => title.includes(k))) roleBonus = 12;
  else if (ROLE_GROUPS["Research & UX Track"].keywords.some(k => title.includes(k))) roleBonus = 11;
  else if (ROLE_GROUPS["AI & Ops Track"].keywords.some(k => title.includes(k))) roleBonus = 13;
  else if (ROLE_GROUPS["Content & Docs Track"].keywords.some(k => title.includes(k))) roleBonus = 10;
  else if (ROLE_GROUPS["Customer Success Track"].keywords.some(k => title.includes(k))) roleBonus = 8;

  const rawScore = Math.min(100, skillScore + roleBonus);

  return { rawScore, exactMatches, partialMatches, missingSkills };
}

function detectRoleGroup(jobTitle) {
  for (const [group, config] of Object.entries(ROLE_GROUPS)) {
    if (config.keywords.some(k => jobTitle.toLowerCase().includes(k.toLowerCase()))) {
      return { name: group, color: config.color, icon: config.icon };
    }
  }
  return { name: "General", color: "gray", icon: "💼" };
}

// ============================================================================
// SECTION 3: SHARED UI COMPONENTS
// ============================================================================

function Toast({ message, type = 'success', show, onClose }) {
  useEffect(() => { if (show) { const t = setTimeout(onClose, 2500); return () => clearTimeout(t); } }, [show, onClose]);
  if (!show) return null;
  const colors = { success: 'bg-emerald-600', error: 'bg-red-600', info: 'bg-blue-600' };
  const Icon = type === 'error' ? XCircle : CheckCircle;
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-white font-medium text-sm animate-in slide-in-from-bottom-4 ${colors[type] || colors.info}`}>
      <Icon size={18} /> {message}
    </div>
  );
}

function Badge({ children, variant = 'gray', className = '' }) {
  const v = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  };
  return <span className={`px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 ${v[variant] || v.gray} ${className}`}>{children}</span>;
}

// eslint-disable-next-line no-unused-vars
function StatCard({ icon: IconComponent, label, value, colorClass }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClass}`}><IconComponent size={20} className="text-white" /></div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function MatchScore({ score, size = 12 }) {
  const color = score >= 90 ? 'text-emerald-500' : score >= 70 ? 'text-yellow-500' : score >= 50 ? 'text-orange-500' : 'text-red-500';
  const sizes = { 12: 'w-12 h-12 text-sm', 16: 'w-16 h-16 text-lg', 24: 'w-24 h-24 text-2xl' };
  const r = size === 12 ? 20 : size === 16 ? 28 : 44;
  const c = r * 2 * Math.PI;
  return (
    <div className={`relative flex items-center justify-center font-bold ${color} ${sizes[size]}`}>
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size * 4} ${size * 4}`}>
        <circle cx="50%" cy="50%" r={r} fill="none" strokeWidth="10%" className="stroke-gray-200 dark:stroke-gray-700" />
        <circle cx="50%" cy="50%" r={r} fill="none" stroke="currentColor" strokeWidth="10%" strokeDasharray={c} strokeDashoffset={c - (c * score) / 100} className="transition-all duration-1000" strokeLinecap="round" />
      </svg>
      <span>{score}%</span>
    </div>
  );
}

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const v = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
    destructive: 'bg-red-500 text-white shadow-md hover:bg-red-600'
  };
  const s = { sm: 'px-3 py-1.5 text-xs rounded-lg', md: 'px-4 py-2 rounded-xl text-sm font-medium', lg: 'px-6 py-3 rounded-xl text-base' };
  return <button className={`inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 disabled:opacity-50 ${v[variant]} ${s[size]} ${className}`} {...props}>{children}</button>;
}

// ============================================================================
// SECTION 4: TAB 1 - JOB SEARCH & ATS CHECKER
// ============================================================================

function ATSPanel({ job, onClose, savedNotes, setSavedNotes, showToast }) {
  const analysis = calcATSScore(job.skills, job.title);
  const [note, setNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  const vText = analysis.rawScore >= 90 ? { color: 'text-emerald-500', t: 'Excellent Match — Apply Immediately!' }
    : analysis.rawScore >= 70 ? { color: 'text-yellow-500', t: 'Good Match — Apply with minor tweaks' }
      : analysis.rawScore >= 50 ? { color: 'text-orange-500', t: 'Average — Improve resume first' }
        : { color: 'text-red-500', t: 'Weak Match — High effort, low return' };

  const getSmartTips = () => {
    const tips = [];
    if (analysis.missingSkills.includes('sql') || analysis.missingSkills.includes('sql basic')) tips.push("You have 'SQL' — rephrase it to match ATS exactly.");
    if (analysis.missingSkills.includes('jira')) tips.push("Add Jira to tools — it's free to learn at atlassian.com/university.");
    if (analysis.rawScore > 80) tips.push("⚡ Strong match! Apply within 24hrs for the best chance.");
    if (job.applicantCount < 10) tips.push("🚨 URGENT: Under 10 applicants — apply in next 2 hours!");
    tips.push("Your McKinsey Forward credential is rare — mention it in your cover letter.");
    return tips;
  };

  const saveNote = () => {
    if (!note.trim()) return;
    setSavedNotes([...savedNotes, { id: Date.now(), jobId: job.id, company: job.company, title: job.title, text: note }]);
    setNote(''); setShowNoteForm(false); showToast('Note saved to Resume tab');
  };

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl px-5 pb-5 animate-in slide-in-from-top-2">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold flex items-center gap-2 text-gray-900 dark:text-white"><BarChart3 size={18} className="text-blue-500" /> ATS Analysis</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={16} /></button>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
          <MatchScore score={analysis.rawScore} size={24} />
          <p className={`mt-2 font-bold text-sm text-center ${vText.color}`}>{vText.t}</p>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">✅ Matched Skills</p>
            <div className="flex flex-wrap gap-1.5">{analysis.exactMatches.map(s => <Badge key={s} variant="green">{s}</Badge>)}
              {analysis.exactMatches.length === 0 && <span className="text-sm text-gray-400">None</span>}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">🟡 Partial Matches</p>
            <div className="flex flex-wrap gap-1.5">{analysis.partialMatches.map(s => <Badge key={s} variant="orange">{s}</Badge>)}
              {analysis.partialMatches.length === 0 && <span className="text-sm text-gray-400">None</span>}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">❌ Missing Skills</p>
            <div className="flex flex-wrap gap-1.5">{analysis.missingSkills.map(s => <Badge key={s} variant="red">{s}</Badge>)}
              {analysis.missingSkills.length === 0 && <span className="text-sm text-gray-400">None</span>}</div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-4">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase flex items-center gap-1.5"><Sparkles size={14} className="text-purple-500" /> Smart Tips for this Role</p>
        <ul className="space-y-2">
          {getSmartTips().map((t, i) => <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> {t}</li>)}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        {showNoteForm ? (
          <div className="w-full flex gap-2">
            <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Type a note (e.g. 'Add Notion to resume')" className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white" />
            <Button variant="primary" size="sm" onClick={saveNote}>Save Note</Button>
            <Button variant="secondary" size="sm" onClick={() => setShowNoteForm(false)}><X size={14} /></Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setShowNoteForm(true)}><Edit3 size={14} /> Note Changes</Button>
        )}
      </div>
    </div>
  );
}

function JobSearchTab({ savedJobs, setSavedJobs, savedNotes, setSavedNotes, showToast }) {
  const [apiJobs, setApiJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [roleFilters, setRoleFilters] = useState([]);
  const [expF, setExpF] = useState([]);
  const [jobTypeF, setJobTypeF] = useState('All');
  const [hideBPO, setHideBPO] = useState(true);
  const [under10, setUnder10] = useState(false);
  const [easyApply, setEasyApply] = useState(false);
  const [activeAtsJob, setActiveAtsJob] = useState(null);
  const debouncedQ = useDebounce(q);

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.json())
      .then(d => {
        const mapped = (d.data || [])
          .filter(j => {
            const allKeywords = Object.values(ROLE_GROUPS).flatMap(g => g.keywords);
            const title = j.title.toLowerCase();
            return allKeywords.some(k => title.includes(k.toLowerCase())) &&
              !BLOCKED_KEYWORDS.some(k => title.includes(k.toLowerCase()));
          })
          .slice(0, 15).map((j, i) => ({
            id: `api-${i}`, title: j.title, company: j.company_name, location: j.location || 'Remote',
            salary: j.remote ? 'Remote' : 'On-site', skills: (j.tags || []).slice(0, 5),
            isVerified: true, postedHoursAgo: Math.floor(Math.random() * 48), applyUrl: j.url,
            source: 'Arbeitnow', applicantCount: Math.floor(Math.random() * 100), isEasyApply: Math.random() > 0.5
          }));
        setApiJobs(mapped);
      })
      .catch(() => showToast('Error fetching jobs', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  const allJobs = [...MOCK_JOBS, ...apiJobs];
  const filtered = allJobs.filter(j => {
    if (hideBPO && BLOCKED_KEYWORDS.some(k => j.title.toLowerCase().includes(k.toLowerCase()))) return false;
    if (debouncedQ && !j.title.toLowerCase().includes(debouncedQ.toLowerCase()) && !j.skills.some(s => s.toLowerCase().includes(debouncedQ.toLowerCase()))) return false;

    const roleGroup = detectRoleGroup(j.title).name;
    if (roleFilters.length > 0 && !roleFilters.includes(roleGroup)) return false;

    if (expF.length > 0) {
      const titleLower = j.title.toLowerCase();
      const isIntern = titleLower.includes('intern');
      const isFresher = titleLower.includes('fresher') || titleLower.includes('junior');
      const isEntry = !isIntern && !isFresher;
      let matchedExp = false;
      if (expF.includes('Intern') && isIntern) matchedExp = true;
      if (expF.includes('Fresher') && isFresher) matchedExp = true;
      if (expF.includes('Entry Level') && isEntry) matchedExp = true;
      if (!matchedExp) return false;
    }

    if (jobTypeF !== 'All') {
      const titleLower = j.title.toLowerCase();
      if (jobTypeF === 'Internship' && !titleLower.includes('intern')) return false;
      if (jobTypeF === 'Contract' && !titleLower.includes('contract')) return false;
      if (jobTypeF === 'Part-Time' && !titleLower.includes('part-time')) return false;
      if (jobTypeF === 'Full-Time' && (titleLower.includes('intern') || titleLower.includes('contract') || titleLower.includes('part-time'))) return false;
    }

    if (under10 && j.applicantCount >= 10) return false;
    if (easyApply && !j.isEasyApply) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search titles or skills..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex gap-2 shrink-0">
            <select value={expF.join(',')} onChange={e => {
              const val = e.target.value;
              setExpF(val ? val.split(',') : []);
            }} className="px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <option value="">Exp: All</option>
              <option value="Intern,Fresher">Intern + Fresher</option>
              <option value="Intern">Intern Only</option>
              <option value="Fresher">Fresher Only</option>
              <option value="Entry Level">Entry Level (1-2yr)</option>
            </select>
            <select value={jobTypeF} onChange={e => setJobTypeF(e.target.value)} className="px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <option value="All">Type: All</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide w-full">
          <button onClick={() => setRoleFilters([])} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${roleFilters.length === 0 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>All Roles</button>
          {Object.entries(ROLE_GROUPS).map(([name, config]) => {
            const isActive = roleFilters.includes(name);
            return (
              <button key={name} onClick={() => {
                if (isActive) setRoleFilters(roleFilters.filter(r => r !== name));
                else setRoleFilters([...roleFilters, name]);
              }} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-md ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <span>{config.icon}</span> {name.replace(' Track', '')}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 scrollbar-hide">
          <button onClick={() => setHideBPO(!hideBPO)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap transition-colors shadow-sm ${hideBPO ? 'bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-800 dark:text-indigo-300' : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><Shield size={12} className="inline mr-1" /> Hide BPO/Sales</button>
          <button onClick={() => setUnder10(!under10)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap transition-colors shadow-sm ${under10 ? 'bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900/40 dark:border-orange-800 dark:text-orange-300' : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><Flame size={12} className="inline mr-1" /> Under 10</button>
          <button onClick={() => setEasyApply(!easyApply)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap transition-colors shadow-sm ${easyApply ? 'bg-violet-100 border-violet-200 text-violet-700 dark:bg-violet-900/40 dark:border-violet-800 dark:text-violet-300' : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><Zap size={12} className="inline mr-1" /> Easy Apply</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? [1, 2, 3].map(i => <div key={i} className="h-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl animate-pulse shadow-sm" />) :
          filtered.map(job => {
            const isSaved = savedJobs.some(s => s.id === job.id);
            const an = calcATSScore(job.skills, job.title);
            const rGroup = detectRoleGroup(job.title);
            return (
              <div key={job.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3 items-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${rGroup.color}-500 to-${rGroup.color}-700 text-white font-bold flex items-center justify-center shrink-0 shadow-inner text-xl`}>{rGroup.icon}</div>
                    <div><p className={`text-sm font-semibold text-${rGroup.color}-600 dark:text-${rGroup.color}-400 flex items-center gap-1.5`}>{job.company}</p><h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">{job.title}</h3></div>
                  </div>
                  <button onClick={() => { if (isSaved) { setSavedJobs(savedJobs.filter(s => s.id !== job.id)); showToast('Removed'); } else { setSavedJobs([...savedJobs, job]); showToast('Saved'); } }} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {isSaved ? <BookmarkCheck className="text-blue-500" /> : <Bookmark />}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Badge variant={rGroup.color}>{rGroup.name}</Badge>
                  {job.postedHoursAgo < 24 && <Badge variant="red">🆕 New</Badge>}
                  {job.applicantCount < 10 && <Badge variant="orange">🔥 Under 10</Badge>}
                  {job.isVerified && <Badge variant="green">✅ Verified</Badge>}
                  {job.source === 'Company Direct' && <Badge variant="blue">🏢 Direct</Badge>}
                  {job.isEasyApply && <Badge variant="violet">⚡ Easy Apply</Badge>}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-3 font-medium">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" />{job.location}</span>
                    <span className="flex items-center gap-1">💰 <span className="text-gray-700 dark:text-gray-300">{job.salary}</span></span>
                    <span className="flex items-center gap-1"><Users size={14} className="text-gray-400" />{job.applicantCount} applicants</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-gray-400" />{job.postedHoursAgo}h ago</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <MatchScore score={an.rawScore} />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{an.exactMatches.length + an.partialMatches.length}/{job.skills.length || 1} matched</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills.map(s => <span key={s} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700">{s}</span>)}
                </div>

                <div className="mt-5 flex gap-2 border-t border-gray-100 dark:border-gray-700 pt-5">
                  <Button variant="outline" onClick={() => setActiveAtsJob(activeAtsJob === job.id ? null : job.id)}>
                    <Search size={16} /> Check Resume
                  </Button>
                  <Button variant="primary" className="ml-auto" onClick={() => window.open(job.applyUrl || '#', '_blank')}>
                    <Rocket size={16} /> Apply Now
                  </Button>
                </div>

                {activeAtsJob === job.id && <ATSPanel job={job} onClose={() => setActiveAtsJob(null)} savedNotes={savedNotes} setSavedNotes={setSavedNotes} showToast={showToast} />}
              </div>
            );
          })}
        {!loading && filtered.length === 0 && <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"><Briefcase size={40} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500 font-medium">No jobs match your selected tracks.</p></div>}
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 5: TAB 2 - LINKEDIN FINDER
// ============================================================================

function LinkedInFinderTab({ showToast }) {
  const [title, setTitle] = useState('');
  const [exp, setExp] = useState('');
  const [date, setDate] = useState('');
  const [under10, setUnder10] = useState(false);
  const [easyApply, setEasyApply] = useState(false);
  const [url, setUrl] = useState('');

  const links = [
    { l: '📦 Product Analyst Fresher', i: Briefcase, u: 'https://www.linkedin.com/jobs/search/?keywords=Product+Analyst&f_E=1&sortBy=DD' },
    { l: '📦 APM Under 10', i: Flame, u: 'https://www.linkedin.com/jobs/search/?keywords=Associate+Product+Manager&f_WT=2&f_EA=true&sortBy=DD' },
    { l: '🏗️ Project Coordinator', i: Building2, u: 'https://www.linkedin.com/jobs/search/?keywords=Project+Coordinator&f_WT=2&f_E=1&sortBy=DD' },
    { l: '🏗️ Program Manager Intern', i: ClipboardList, u: 'https://www.linkedin.com/jobs/search/?keywords=Program+Manager+Intern&f_WT=2&sortBy=DD' },
    { l: '📊 Business Analyst Fresher', i: BarChart3, u: 'https://www.linkedin.com/jobs/search/?keywords=Business+Analyst&f_WT=2&f_E=1&f_EA=true&sortBy=DD' },
    { l: '📊 Strategy Analyst Intern', i: TrendingUp, u: 'https://www.linkedin.com/jobs/search/?keywords=Strategy+Analyst+Intern&f_WT=2&sortBy=DD' },
    { l: '📈 Data Analyst No Code', i: Search, u: 'https://www.linkedin.com/jobs/search/?keywords=Data+Analyst&f_WT=2&f_E=1&f_EA=true&sortBy=DD' },
    { l: '📈 Analytics Intern Remote', i: Globe, u: 'https://www.linkedin.com/jobs/search/?keywords=Analytics+Intern&f_WT=2&sortBy=DD' },
    { l: '🔬 UX Researcher Intern', i: Users, u: 'https://www.linkedin.com/jobs/search/?keywords=UX+Researcher+Intern&f_WT=2&sortBy=DD' },
    { l: '🔬 Growth Analyst Remote', i: TrendingUp, u: 'https://www.linkedin.com/jobs/search/?keywords=Growth+Analyst&f_WT=2&f_E=1&sortBy=DD' },
    { l: '✍️ Tech Writer Fresher', i: FileText, u: 'https://www.linkedin.com/jobs/search/?keywords=Technical+Writer&f_WT=2&f_E=1&sortBy=DD' },
    { l: '✍️ UX Writer Intern', i: Edit3, u: 'https://www.linkedin.com/jobs/search/?keywords=UX+Writer+Intern&f_WT=2&sortBy=DD' },
    { l: '🤖 AI Product Intern', i: Sparkles, u: 'https://www.linkedin.com/jobs/search/?keywords=AI+Product+Intern&f_WT=2&sortBy=DD' },
    { l: '🤖 AI Operations Analyst', i: Rocket, u: 'https://www.linkedin.com/jobs/search/?keywords=AI+Operations+Analyst&f_WT=2&sortBy=DD' },
    { l: '⚡ Under 10 + Easy Apply', i: Zap, u: 'https://www.linkedin.com/jobs/search/?keywords=Product+OR+Analyst+OR+Coordinator&f_WT=2&f_EA=true&f_LF=f_AL&f_E=1&sortBy=DD' },
    { l: '🔥 Posted Last Hour (All)', i: Clock, u: 'https://www.linkedin.com/jobs/search/?keywords=Analyst+Coordinator+Researcher&f_WT=2&f_TPR=r3600&sortBy=DD' },
  ];

  const build = () => {
    let base = 'https://www.linkedin.com/jobs/search/?f_WT=2&';
    const p = [];
    if (title) p.push(`keywords=${encodeURIComponent(title)}`);
    if (exp === 'fresher') p.push('f_E=1'); else if (exp === '1-2yr') p.push('f_E=2');
    if (date === '1h') p.push('f_TPR=r3600'); else if (date === '24h') p.push('f_TPR=r86400'); else if (date === '1w') p.push('f_TPR=r604800');
    if (under10) p.push('f_EA=true');
    if (easyApply) p.push('f_LF=f_AL');
    p.push('sortBy=DD');
    setUrl(base + p.join('&'));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> APM Quick Links (Remote)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {links.map((l, i) => (
            <a key={i} href={l.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-colors group">
              <l.i size={16} className="text-blue-500 shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{l.l}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Link2 size={18} className="text-blue-500" /> Custom APM Search Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Job Title (e.g. Product Analyst)" className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" />
          <select value={exp} onChange={e => setExp(e.target.value)} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white">
            <option value="">Experience Level</option><option value="fresher">Fresher (0-1yr)</option><option value="1-2yr">1-2 Years</option>
          </select>
          <select value={date} onChange={e => setDate(e.target.value)} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white">
            <option value="">Date Posted</option><option value="1h">Last Hour</option><option value="24h">Last 24 Hours</option><option value="1w">Last Week</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"><input type="checkbox" checked={under10} onChange={e => setUnder10(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> Under 10 Applicants</label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"><input type="checkbox" checked={easyApply} onChange={e => setEasyApply(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> Easy Apply</label>
          <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded ml-auto">Location locked to 'Remote'</span>
        </div>
        <div className="flex gap-2">
          <Button onClick={build}><Sparkles size={16} /> Build URL</Button>
          {url && <Button variant="secondary" onClick={() => window.open(url, '_blank')}><ExternalLink size={16} /> Open LinkedIn</Button>}
        </div>
        {url && <div onClick={() => { navigator.clipboard.writeText(url); showToast('URL Copied'); }} className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-mono text-gray-500 break-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">{url}</div>}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Building2 size={18} className="text-purple-500" /> APM Friendly Career Pages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANIES.map(c => (
            <div key={c.name} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-sm">{c.name.slice(0, 2).toUpperCase()}</div>
                <div><p className="font-semibold text-sm text-gray-900 dark:text-white">{c.name}</p><p className="text-xs text-gray-500 flex items-center gap-1"><Shield size={10} /> {c.ats}</p></div>
              </div>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><ExternalLink size={16} /></a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 6: TAB 3 - HR CONTACTS
// ============================================================================

function HRContactsTab({ hrContacts, setHrContacts, showToast }) {
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', designation: '', email: '', phone: '', linkedinUrl: '', roleHiring: '' });
  const debouncedQ = useDebounce(q);

  const filtered = hrContacts.filter(h => h.name.toLowerCase().includes(debouncedQ.toLowerCase()) || h.company.toLowerCase().includes(debouncedQ.toLowerCase()));

  const saveHR = () => {
    if (!form.name || !form.company || !form.email) return;
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
    setHrContacts([...hrContacts, { ...form, id: `h-${Date.now()}`, isVerified: false, avatarColor: colors[Math.floor(Math.random() * colors.length)] }]);
    setShowAdd(false); setForm({ name: '', company: '', designation: '', email: '', phone: '', linkedinUrl: '', roleHiring: '' });
    showToast('HR Contact Saved');
  };

  const copy = (txt, lbl) => { navigator.clipboard.writeText(txt); showToast(`${lbl} Copied`); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search HR by name or company..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white shadow-sm" />
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}>{showAdd ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add HR</>}</Button>
      </div>

      {showAdd && (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add HR Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[['name', 'Name *'], ['company', 'Company *'], ['designation', 'Designation'], ['email', 'Email *'], ['phone', 'Phone'], ['linkedinUrl', 'LinkedIn URL'], ['roleHiring', 'Role Hiring For']].map(([k, p]) => (
              <input key={k} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} placeholder={p} className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" />
            ))}
          </div>
          <Button onClick={saveHR}><CheckCircle size={16} /> Save Contact</Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(h => {
          const mailSubject = encodeURIComponent(`APM Application – Koushik | McKinsey Forward | BCA 2025`);
          return (
            <div key={h.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start mb-4">
                <div className="w-12 h-12 rounded-full text-white font-bold flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: h.avatarColor }}>{h.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 dark:text-white truncate flex items-center gap-1">{h.name} {h.isVerified && <Shield size={12} className="text-emerald-500 shrink-0" />}</h4>
                  <p className="text-xs text-gray-500 truncate">{h.designation}</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 truncate">{h.company}</p>
                  {h.roleHiring && <p className="text-[10px] mt-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-2 py-0.5 rounded-full inline-block truncate max-w-full">🎯 {h.roleHiring}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <Button variant="outline" size="sm" onClick={() => copy(h.email, 'Email')}><Copy size={14} /> Email</Button>
                <a href={`mailto:${h.email}?subject=${mailSubject}`} className="contents"><Button variant="outline" size="sm"><Mail size={14} /> Cold Email</Button></a>
                {h.linkedinUrl && <a href={h.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contents"><Button variant="outline" size="sm"><Linkedin size={14} /> LinkedIn</Button></a>}
                {h.phone && <Button variant="outline" size="sm" onClick={() => copy(h.phone, 'Phone')}><Phone size={14} /> Phone</Button>}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">No HR contacts found.</div>}
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 7: TAB 4 - RESUME
// ============================================================================

function ResumeTab({ savedNotes, setSavedNotes, showToast }) {
  const tips = [
    "Lead bullets with impact: 'Reduced X by Y% using Z'",
    "McKinsey Forward is rare — it should be Section 2 after Education",
    "Add a 'Product Sense' section: 1 teardown insight per role",
    "Quantify all achievements: '15+ presentations', '80% time saved'",
    "Use exact ATS keywords: PRD, OKRs, RICE, Agile, Scrum, Sprint",
    "1 page max — APM intern roles get 6-second ATS scans"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0"><FileText size={32} className="text-white" /></div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Thalari_Koushik_APM_Resume.pdf</h3>
          <p className="text-sm text-gray-500 mt-1">91 KB • Uploaded 2026-03-02 • Role: APM</p>
          <div className="mt-4 flex gap-2 justify-center md:justify-start">
            <Button variant="outline"><Upload size={16} /> Replace</Button>
            <Button variant="outline" className="text-red-600 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 size={16} /> Remove</Button>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
          <MatchScore score={87} size={16} />
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-2">Overall ATS Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l: 'Keywords', v: '90%', s: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' }, { l: 'Format', v: '85%', s: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' }, { l: 'Length', v: '95%', s: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' }, { l: 'Impact Verbs', v: '80%', s: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' }, { l: 'Quantification', v: '75%', s: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' }].slice(0, 4).map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">{s.l}</span>
            <span className={`px-2 py-1 rounded-md text-sm font-bold ${s.s}`}>{s.v}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Edit3 size={18} className="text-blue-500" /> Resume Edit Notes</h3>
          {savedNotes.length === 0 ? (
            <div className="text-center py-8 text-gray-400"><ClipboardList size={32} className="mx-auto mb-2 opacity-50" />No notes yet — use 'Check Resume' on any job.</div>
          ) : (
            <div className="space-y-3">
              {savedNotes.map(n => (
                <div key={n.id} className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl relative group">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">{n.title} @ {n.company}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 pr-6">{n.text}</p>
                  <button onClick={() => { setSavedNotes(savedNotes.filter(x => x.id !== n.id)); showToast('Note Deleted'); }} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-yellow-500" /> Top APM Resume Tips</h3>
          <div className="space-y-3">
            {tips.map((t, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                <p className="text-sm text-gray-800 dark:text-gray-200">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 8: TAB 5 - APPLICATION TRACKER
// ============================================================================

function ApplicationsTab({ apps, setApps, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', company: '', type: 'Remote', source: 'LinkedIn', date: new Date().toISOString().split('T')[0], status: 'Applied', match: 80, under10: false, easyApply: false, notes: '' });

  const stats = [
    { l: 'Total Applications', v: apps.length, c: 'bg-blue-500', i: Briefcase },
    { l: 'Interviews', v: apps.filter(a => a.status.includes('Interview')).length, c: 'bg-yellow-500', i: Calendar },
    { l: 'Offers', v: apps.filter(a => a.status === 'Offered').length, c: 'bg-emerald-500', i: Award },
    { l: 'Pending', v: apps.filter(a => ['Applied', 'Viewed', 'Assignment Sent'].includes(a.status)).length, c: 'bg-purple-500', i: Clock },
  ];

  const getInsights = () => {
    const alerts = [];
    if (apps.some(a => a.status === 'Ghosted')) alerts.push({ m: 'You have ghosted applications. Follow up via email after 7 days.', t: 'info' });
    if (apps.some(a => a.match < 60)) alerts.push({ m: 'Some applications have <60% match. Improve resume before applying.', t: 'warn' });
    if (apps.filter(a => a.under10).length >= 5) alerts.push({ m: 'Applied to 5+ "Under 10 applicants" jobs. Great strategy!', t: 'success' });
    return alerts;
  };

  const saveApp = () => {
    if (!form.title || !form.company) return;
    setApps([{ ...form, id: `app-${Date.now()}` }, ...apps]);
    setShowForm(false);
    showToast('Application Tracked!');
    setForm({ title: '', company: '', type: 'Remote', source: 'LinkedIn', date: new Date().toISOString().split('T')[0], status: 'Applied', match: 80, under10: false, easyApply: false, notes: '' });
  };

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Viewed': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Interview Scheduled': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Interviewing': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Assignment Sent': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Offered': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Rejected': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Ghosted': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    'Withdrawn': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} icon={s.i} label={s.l} value={s.v} colorClass={s.c} />)}
      </div>

      {getInsights().map((a, i) => (
        <div key={i} className={`p-4 rounded-xl flex items-center gap-3 border ${a.t === 'warn' ? 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300' : a.t === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'}`}>
          <AlertCircle size={18} /> <span className="text-sm font-medium">{a.m}</span>
        </div>
      ))}

      <div className="flex justify-end"><Button onClick={() => setShowForm(!showForm)}>{showForm ? <X size={16} /> : <Plus size={16} />} Add Application</Button></div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input placeholder="Job Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" />
            <input placeholder="Company *" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" />
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm">
              {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" />
            <div className="flex items-center gap-2 px-2">
              <label className="text-sm">Match %: {form.match}</label>
              <input type="range" min="0" max="100" value={form.match} onChange={e => setForm({ ...form, match: parseInt(e.target.value) })} className="flex-1" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.under10} onChange={e => setForm({ ...form, under10: e.target.checked })} className="rounded" /> Under 10</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.easyApply} onChange={e => setForm({ ...form, easyApply: e.target.checked })} className="rounded" /> Easy Apply</label>
            </div>
          </div>
          <Button onClick={saveApp} className="w-full sm:w-auto"><CheckCircle size={16} /> Track Application</Button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-sm">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Company & Role</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Match</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(a => (
                <tr key={a.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900 dark:text-white">{a.company}</p>
                    <p className="text-sm text-gray-500">{a.title} {a.under10 && '🔥'} {a.easyApply && '⚡'}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(a.date).toLocaleDateString()}</td>
                  <td className="p-4"><Badge variant={a.match >= 80 ? 'green' : a.match >= 60 ? 'orange' : 'red'}>{a.match}%</Badge></td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span></td>
                  <td className="p-4 text-right">
                    <select value={a.status} onChange={e => { const n = [...apps]; const i = n.findIndex(x => x.id === a.id); n[i].status = e.target.value; setApps(n); showToast('Status Updated'); }} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs outline-none mr-2 max-w-[120px]">
                      {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={() => { setApps(apps.filter(x => x.id !== a.id)); showToast('Deleted'); }} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-gray-500">No applications tracked yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 9: TAB 6 - MY PROFILE
// ============================================================================

function MyProfileTab() {
  const p = USER_PROFILE;

  const skillGroups = [
    { n: 'PM Skills', c: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', s: ['Agile', 'Scrum', 'PRD Writing', 'OKRs', 'RICE Framework', 'GTM Strategy', 'Roadmap Planning', 'Stakeholder Management', 'Backlog Prioritization', 'Sprint Planning', 'User Stories', 'KPI Tracking', 'MECE Framework'] },
    { n: 'Research & UX', c: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', s: ['Kano Analysis', 'User Research', 'A/B Testing', 'Design Thinking', 'Funnel Analysis', 'Competitive Intelligence', 'UX Research', 'User Personas', 'Customer Journey Mapping'] },
    { n: 'Tools & Tech', c: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300', s: ['Notion', 'Google Analytics', 'SQL', 'Data Visualization', 'Web Scraping', 'Python', 'Figma', 'Google Sheets', 'PowerPoint', 'MS Teams'] },
    { n: 'AI & ML Tools', c: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', s: ['Claude AI', 'Manus AI', 'NLP', 'OpenAI APIs'] }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-bold flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 shrink-0">
            {p.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{p.name}</h2>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{p.title}</p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><Mail size={16} /> {p.email}</span>
              <a href={`https://${p.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500"><Linkedin size={16} /> {p.linkedin}</a>
              <a href={`https://${p.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-purple-500"><Globe size={16} /> {p.website}</a>
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {p.location}</span>
            </div>
          </div>
          <Button variant="outline" className="shrink-0"><Edit3 size={16} /> Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-yellow-500" /> Skill Cloud</h3>
            <div className="space-y-6">
              {skillGroups.map(g => (
                <div key={g.n}>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">{g.n}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.s.filter(s => p.resumeSkills.includes(s)).map(s => <span key={s} className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${g.c}`}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Award size={18} className="text-orange-500" /> Certifications</h3>
              <ul className="space-y-3">
                {p.certifications.map((c, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> <span dangerouslySetInnerHTML={{ __html: c.replace('McKinsey Forward', '<strong>McKinsey Forward</strong>') }} /></li>)}
              </ul>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Award size={18} className="text-blue-500" /> Education</h3>
              <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> {p.education}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Briefcase size={18} className="text-blue-500" /> Target Roles & Tracks</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(ROLE_GROUPS).map(([groupName, config]) => (
                <span key={groupName} className={`px-2.5 py-1 text-xs font-semibold border rounded-lg flex items-center gap-1.5 shadow-sm bg-${config.color}-50 text-${config.color}-700 border-${config.color}-200 dark:bg-${config.color}-900/20 dark:text-${config.color}-300 dark:border-${config.color}-800/30`}>
                  <span>{config.icon}</span> {groupName}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wider">Top Keywords</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {Object.values(ROLE_GROUPS).flatMap(g => g.keywords.slice(0, 2)).join(', ')}...
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Shield size={18} className="text-red-500" /> Blocked Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {BLOCKED_KEYWORDS.map(k => <span key={k} className="px-2.5 py-1 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 text-xs font-semibold border border-red-200 dark:border-red-800/30 rounded-lg opacity-80 line-through">{k}</span>)}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Eye size={18} className="text-gray-500" /> Preferences</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5"><Globe size={12} /> Remote Only</span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5"><Award size={12} /> Fresher OK</span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5"><Zap size={12} /> Internships OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 10: MAIN APP COMPONENT
// ============================================================================

export default function JobHunterPro() {
  const [dark, setDark] = useDarkMode();
  const [activeTab, setActiveTab] = useState('jobs');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = useCallback((message, type = 'success') => setToast({ show: true, message, type }), []);

  const [savedJobs, setSavedJobs] = useLocalStorage('jh_saved_jobs', []);
  const [savedNotes, setSavedNotes] = useLocalStorage('jh_resume_notes', []);
  const [hrContacts, setHrContacts] = useLocalStorage('jh_hr_contacts', MOCK_HRS);
  const [apps, setApps] = useLocalStorage('jh_applications', [
    { id: 'app1', title: 'APM Intern', company: 'Razorpay', type: 'Remote', source: 'LinkedIn', date: '2026-02-28', status: 'Applied', match: 92, under10: false, easyApply: true },
    { id: 'app2', title: 'Product Analyst', company: 'Freshworks', type: 'Remote', source: 'Company Direct', date: '2026-02-25', status: 'Interview Scheduled', match: 88, under10: true, easyApply: false },
    { id: 'app3', title: 'Project Coordinator', company: 'Zoho', type: 'Remote', source: 'Naukri', date: '2026-02-20', status: 'Applied', match: 75, under10: false, easyApply: false },
  ]);

  const tabs = [
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'linkedin', label: 'LinkedIn Finder', icon: Linkedin },
    { id: 'hr', label: 'HR Contacts', icon: Users },
    { id: 'resume', label: 'Resume', icon: FileText, badge: savedNotes.length > 0 ? savedNotes.length : null },
    { id: 'applications', label: 'Applications', icon: ClipboardList, badge: apps.length > 0 ? apps.filter(a => ['Applied', 'Viewed', 'Assignment Sent'].includes(a.status)).length : null },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 text-gray-900 dark:text-gray-100 ${dark ? 'dark' : ''}`}>
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                <Briefcase size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block">
                Job Hunter <span className="gradient-text">Pro v5</span>
              </h1>
            </div>

            <div className="flex flex-1 justify-center sm:justify-start overflow-x-auto scrollbar-hide px-2 sm:px-8">
              <div className="flex items-center gap-2 sm:gap-4">
                {tabs.map(t => {
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap 
                        ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      <t.icon size={18} />
                      <span className="hidden lg:inline">{t.label}</span>
                      {t.badge && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{t.badge}</span>}
                      {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-full shadow-[0_-2px_8px_rgba(59,130,246,0.5)]"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={() => setDark(!dark)} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-2 shrink-0">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
        {activeTab === 'jobs' && <JobSearchTab savedJobs={savedJobs} setSavedJobs={setSavedJobs} savedNotes={savedNotes} setSavedNotes={setSavedNotes} showToast={showToast} />}
        {activeTab === 'linkedin' && <LinkedInFinderTab showToast={showToast} />}
        {activeTab === 'hr' && <HRContactsTab hrContacts={hrContacts} setHrContacts={setHrContacts} showToast={showToast} />}
        {activeTab === 'resume' && <ResumeTab savedNotes={savedNotes} setSavedNotes={setSavedNotes} showToast={showToast} />}
        {activeTab === 'applications' && <ApplicationsTab apps={apps} setApps={setApps} showToast={showToast} />}
        {activeTab === 'profile' && <MyProfileTab />}
      </main>

      <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
}
