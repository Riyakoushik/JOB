// Normalizes and categorizes job data before DB insertion

export function normalizeJobData(jobs) {
    return jobs.map(job => {
        // Determine category based on keywords
        let category = job.category || 'Other';
        const titleLower = (job.title || '').toLowerCase();

        if (titleLower.includes('product manager') || titleLower.includes('apm')) {
            category = 'Product';
        } else if (titleLower.includes('analyst') || titleLower.includes('data')) {
            category = 'Data/Analyst';
        } else if (titleLower.includes('software') || titleLower.includes('developer') || titleLower.includes('engineer')) {
            category = 'Engineering';
        }

        // Determine tier based on company
        let tier = 'Startup';
        const topTier = ['google', 'amazon', 'facebook', 'meta', 'apple', 'netflix', 'microsoft', 'atlassian', 'uber'];
        const unicorn = ['razorpay', 'cred', 'swiggy', 'zomato', 'phonepe', 'paytm', 'flipkart', 'meesho', 'udaan', 'zerodha'];

        const companyLower = (job.company || '').toLowerCase();

        if (topTier.includes(companyLower)) tier = 'FAANG+';
        else if (unicorn.includes(companyLower)) tier = 'Unicorn';

        // Parse experience
        let experience = 'Not Specified';
        if (titleLower.includes('senior') || titleLower.includes('sr')) experience = 'Senior (5+ yrs)';
        else if (titleLower.includes('lead') || titleLower.includes('principal')) experience = 'Lead (8+ yrs)';
        else if (titleLower.includes('junior') || titleLower.includes('jr') || titleLower.includes('fresher')) experience = 'Fresher (0-2 yrs)';
        else if (titleLower.includes('intern')) experience = 'Internship';
        else experience = 'Mid Level (2-5 yrs)';

        return {
            title: job.title || 'Unknown Title',
            company: job.company || 'Unknown Company',
            source: job.source || 'Unknown Source',
            category,
            tier,
            skills: job.skills || [],
            experience,
            location: job.location || 'Remote/India',
            url: job.url,
            description: job.description || '',
            postedAt: job.postedAt || new Date()
        };
    });
}

// Basic deduplication based on exact URL or title+company
export function deduplicateJobs(jobs) {
    const uniqueUrls = new Set();
    const uniqueCombos = new Set();
    const deduped = [];

    for (const job of jobs) {
        if (!job.url) continue;
        const combo = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;

        if (!uniqueUrls.has(job.url) && !uniqueCombos.has(combo)) {
            uniqueUrls.add(job.url);
            uniqueCombos.add(combo);
            deduped.push(job);
        }
    }

    return deduped;
}
