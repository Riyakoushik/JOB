import axios from 'axios';

// Unified API scrapers for free APIs
export async function fetchRemotiveJobs() {
    try {
        const response = await axios.get('https://remotive.com/api/remote-jobs?category=software-dev');
        const jobs = response.data.jobs || [];
        return jobs.map(job => ({
            title: job.title,
            company: job.company_name,
            source: 'Remotive',
            category: job.category,
            skills: job.tags || [],
            location: job.candidate_required_location,
            url: job.url,
            description: job.description.substring(0, 500),
            postedAt: new Date(job.publication_date)
        }));
    } catch (error) {
        console.error('Error fetching from Remotive:', error.message);
        return [];
    }
}

export async function fetchAdzunaJobs() {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;
    if (!appId || !appKey) return [];

    try {
        const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=50&what="software developer"`);
        const jobs = response.data.results || [];
        return jobs.map(job => ({
            title: job.title,
            company: job.company.display_name,
            source: 'Adzuna',
            category: job.category.label,
            skills: [],
            location: job.location.display_name,
            url: job.redirect_url,
            description: job.description,
            postedAt: new Date(job.created)
        }));
    } catch (error) {
        console.error('Error fetching from Adzuna:', error.message);
        return [];
    }
}

// JSearch (RapidAPI) requires API Key
export async function fetchJSearchJobs() {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) return [];

    try {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: { query: 'software developer in india', page: '1', num_pages: '1' },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        const jobs = response.data.data || [];

        return jobs.map(job => ({
            title: job.job_title,
            company: job.employer_name,
            source: 'JSearch',
            category: job.job_job_title,
            skills: job.job_required_skills || [],
            location: job.job_city ? `${job.job_city}, ${job.job_country}` : 'Remote',
            url: job.job_apply_link,
            description: job.job_description.substring(0, 500),
            postedAt: new Date(job.job_posted_at_datetime_utc)
        }));
    } catch (error) {
        console.error('Error fetching from JSearch:', error.message);
        return [];
    }
}

export async function fetchAllApiJobs() {
    console.log('Fetching from Free APIs...');
    const [remotive, adzuna, jsearch] = await Promise.all([
        fetchRemotiveJobs(),
        fetchAdzunaJobs(),
        fetchJSearchJobs()
    ]);

    return [...remotive, ...adzuna, ...jsearch];
}
