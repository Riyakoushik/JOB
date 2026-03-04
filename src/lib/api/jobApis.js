import { BLOCKED_KEYWORDS } from '@/data/constants';

// ===== NORMALIZE API RESPONSES =====
export function normalizeArbeitnowJob(job) {
    return {
        id: `arb-${job.slug || job.title?.replace(/\s+/g, '-')}-${Date.now()}`,
        title: job.title || 'Untitled',
        company: job.company_name || 'Unknown Company',
        location: job.remote ? 'Remote' : (job.location || 'Not specified'),
        salary: job.salary || 'Not disclosed',
        skills: Array.isArray(job.tags) ? job.tags : [],
        applicantCount: Math.floor(Math.random() * 50),
        isEasyApply: true,
        isVerified: false,
        source: 'Arbeitnow',
        postedHoursAgo: job.created_at
            ? Math.max(1, Math.floor((Date.now() - new Date(job.created_at).getTime()) / 3600000))
            : 24,
        description: job.description || '',
        applyUrl: job.url || '#',
    };
}

export function normalizeRemotiveJob(job) {
    return {
        id: `rem-${job.id || Date.now()}`,
        title: job.title || 'Untitled',
        company: job.company_name || 'Unknown Company',
        location: job.candidate_required_location || 'Remote',
        salary: job.salary || 'Not disclosed',
        skills: Array.isArray(job.tags) ? job.tags : [],
        applicantCount: Math.floor(Math.random() * 50),
        isEasyApply: false,
        isVerified: true,
        source: 'Remotive',
        postedHoursAgo: job.publication_date
            ? Math.max(1, Math.floor((Date.now() - new Date(job.publication_date).getTime()) / 3600000))
            : 24,
        description: job.description || '',
        applyUrl: job.url || '#',
    };
}

export function isBlockedJob(title) {
    const lower = title.toLowerCase();
    return BLOCKED_KEYWORDS.some(kw => lower.includes(kw));
}

// --- GROUP 1: Free APIs (No Key, Unlimited) ---
export const fetchRemotive = async () => {
    try {
        const res = await fetch('https://remotive.com/api/remote-jobs?limit=100');
        const data = await res.json();
        return (data.jobs || []).map(j => ({
            id: `rem-${j.id}`,
            title: j.title,
            company: j.company_name,
            location: 'Remote',
            salary: j.salary || 'Not disclosed',
            skills: j.tags || [],
            applyUrl: j.url,
            postedHoursAgo: Math.floor((new Date() - new Date(j.publication_date)) / 3600000),
            source: 'Remotive',
            isEasyApply: true,
            isVerified: false
        }));
    } catch { return []; }
};

export const fetchArbeitnow = async () => {
    try {
        const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
        const data = await res.json();
        return (data.data || []).map(j => ({
            id: `arb-${j.slug}`,
            title: j.title,
            company: j.company_name,
            location: j.location || 'Remote',
            salary: 'Not disclosed',
            skills: j.tags || [],
            applyUrl: j.url,
            postedHoursAgo: Math.floor((new Date() - new Date(j.created_at * 1000)) / 3600000),
            source: 'Arbeitnow',
            isEasyApply: true,
            isVerified: false
        }));
    } catch { return []; }
};

export const fetchJobicy = async () => {
    try {
        const res = await fetch('https://jobicy.com/api/v0/remote-jobs?count=50&industry=product');
        const data = await res.json();
        return (data.jobs || []).map(j => ({
            id: `jcy-${j.id}`,
            title: j.jobTitle,
            company: j.companyName,
            location: 'Remote',
            salary: j.annualSalaryMin ? `$${j.annualSalaryMin}–$${j.annualSalaryMax}` : 'Not disclosed',
            skills: j.jobIndustry ? [j.jobIndustry] : [],
            applyUrl: j.url,
            postedHoursAgo: Math.floor((new Date() - new Date(j.pubDate)) / 3600000),
            source: 'Jobicy',
            isEasyApply: true,
            isVerified: false
        }));
    } catch { return []; }
};

export const fetchHimalayas = async () => {
    try {
        const res = await fetch('https://himalayas.app/jobs/api?limit=100');
        const data = await res.json();
        return (data.jobs || []).map(j => ({
            id: `him-${j.id}`,
            title: j.title,
            company: j.company?.name || 'Unknown',
            location: 'Remote',
            salary: j.salary || 'Not disclosed',
            skills: j.skills || [],
            applyUrl: j.applicationLink,
            postedHoursAgo: Math.floor((new Date() - new Date(j.publishedAt)) / 3600000),
            source: 'Himalayas',
            isEasyApply: true,
            isVerified: false
        }));
    } catch { return []; }
};

export const fetchInternshala = async () => {
    try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://internshala.com/rss/jobs.xml');
        const data = await res.json();
        return (data.items || []).map((j, i) => ({
            id: `ins-${i}`,
            title: j.title,
            company: j.author || 'Company',
            location: 'India',
            salary: 'Not disclosed',
            skills: [],
            applyUrl: j.link,
            postedHoursAgo: Math.floor((new Date() - new Date(j.pubDate)) / 3600000),
            source: 'Internshala',
            isEasyApply: true,
            isVerified: true
        }));
    } catch { return []; }
};

// --- GROUP 2: ATS Direct APIs (No Key, Company Career Pages) ---
const GREENHOUSE_COMPANIES = [
    'razorpay', 'freshworks', 'cred', 'meesho', 'notion',
    'canva', 'hubspot', 'zendesk', 'duolingo', 'figma',
    'scaleai', 'brex', 'stripe', 'dropbox', 'twilio',
    'coinbase', 'doordash', 'robinhood', 'airbnb'
];

export const fetchGreenhouse = async () => {
    const results = await Promise.allSettled(
        GREENHOUSE_COMPANIES.map(async (company) => {
            const res = await fetch(
                `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`
            );
            const data = await res.json();
            return (data.jobs || []).map(j => ({
                id: `gh-${company}-${j.id}`,
                title: j.title,
                company: company.charAt(0).toUpperCase() + company.slice(1),
                location: j.location?.name || 'Remote',
                salary: 'Not disclosed',
                skills: [],
                applyUrl: j.absolute_url,
                postedHoursAgo: Math.floor((new Date() - new Date(j.updated_at)) / 3600000),
                source: 'Greenhouse',
                isEasyApply: true,
                isVerified: true
            }));
        })
    );
    return results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);
};

const LEVER_COMPANIES = [
    'groww', 'swiggy', 'phonepe', 'atlassian', 'shopify',
    'gitlab', 'postman', 'deel', 'loom', 'mercury',
    'spotify', 'netflix'
];

export const fetchLever = async () => {
    const results = await Promise.allSettled(
        LEVER_COMPANIES.map(async (company) => {
            const res = await fetch(
                `https://api.lever.co/v0/postings/${company}?mode=json`
            );
            const data = await res.json();
            return (data || []).map(j => ({
                id: `lev-${company}-${j.id}`,
                title: j.text,
                company: company.charAt(0).toUpperCase() + company.slice(1),
                location: j.categories?.location || j.workplaceType || 'Remote',
                salary: j.salaryRange
                    ? `${j.salaryRange.min}–${j.salaryRange.max}`
                    : 'Not disclosed',
                skills: j.tags || [],
                applyUrl: j.hostedUrl,
                postedHoursAgo: Math.floor((new Date() - new Date(j.createdAt)) / 3600000),
                source: 'Lever',
                isEasyApply: true,
                isVerified: true
            }));
        })
    );
    return results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);
};

const ASHBY_COMPANIES = [
    'linear', 'retool', 'vercel', 'supabase',
    'perplexity', 'cursor', 'anyscale'
];

export const fetchAshby = async () => {
    const results = await Promise.allSettled(
        ASHBY_COMPANIES.map(async (company) => {
            const res = await fetch(
                `https://api.ashbyhq.com/posting-api/job-board/${company}`
            );
            const data = await res.json();
            return (data.jobPostings || []).map(j => ({
                id: `ash-${company}-${j.id}`,
                title: j.title,
                company: company.charAt(0).toUpperCase() + company.slice(1),
                location: j.locationName || 'Remote',
                salary: j.compensationTierSummary || 'Not disclosed',
                skills: j.teamName ? [j.teamName] : [],
                applyUrl: j.jobUrl,
                postedHoursAgo: Math.floor((new Date() - new Date(j.publishedDate)) / 3600000),
                source: 'Ashby',
                isEasyApply: true,
                isVerified: true
            }));
        })
    );
    return results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);
};

// --- GROUP 3: API Key Sources ---
export const fetchJSearch = async () => {
    const KEY = import.meta.env.VITE_JSEARCH_API_KEY;
    if (!KEY || KEY === 'your_rapidapi_key_here') return [];
    const queries = [
        'associate product manager intern India',
        'product analyst fresher India',
        'business analyst fresher India remote',
        'data analyst fresher India remote',
        'project coordinator India remote',
        'research analyst intern India',
        'AI operations analyst India remote',
        'customer success analyst India',
        'technical writer product India',
        'strategy analyst intern India'
    ];
    const results = await Promise.allSettled(
        queries.map(async (q) => {
            const res = await fetch(
                `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(q)}&page=1&num_pages=1&date_posted=month`,
                {
                    headers: {
                        'X-RapidAPI-Key': KEY,
                        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
                    }
                }
            );
            const data = await res.json();
            return (data.data || []).map(j => ({
                id: `js-${j.job_id}`,
                title: j.job_title,
                company: j.employer_name,
                location: j.job_city || j.job_country || 'India',
                salary: j.job_min_salary
                    ? `₹${j.job_min_salary}–${j.job_max_salary}`
                    : 'Not disclosed',
                skills: j.job_required_skills || [],
                applyUrl: j.job_apply_link,
                postedHoursAgo: Math.floor(
                    (new Date() - new Date(j.job_posted_at_datetime_utc)) / 3600000
                ),
                source: 'JSearch',
                isEasyApply: j.job_apply_is_direct || false,
                isVerified: true
            }));
        })
    );
    return results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);
};

export const fetchAdzuna = async () => {
    const APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
    const APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;
    if (!APP_ID || !APP_KEY || APP_ID === 'your_adzuna_app_id_here') return [];
    const queries = [
        'product manager', 'business analyst',
        'data analyst', 'project coordinator',
        'research analyst', 'strategy analyst'
    ];
    const results = await Promise.allSettled(
        queries.map(async (q) => {
            const res = await fetch(
                `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=20&what=${encodeURIComponent(q)}&sort_by=date&content-type=application/json`
            );
            const data = await res.json();
            return (data.results || []).map(j => ({
                id: `adz-${j.id}`,
                title: j.title,
                company: j.company?.display_name || 'Unknown',
                location: j.location?.display_name || 'India',
                salary: j.salary_min
                    ? `₹${Math.round(j.salary_min / 1000)}K–₹${Math.round(j.salary_max / 1000)}K`
                    : 'Not disclosed',
                skills: [],
                applyUrl: j.redirect_url,
                postedHoursAgo: Math.floor((new Date() - new Date(j.created)) / 3600000),
                source: 'Adzuna',
                isEasyApply: true,
                isVerified: false
            }));
        })
    );
    return results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);
};
