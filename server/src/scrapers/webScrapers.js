import puppeteer from 'puppeteer';

// Generic delay function for rate limiting
const delay = ms => new Promise(res => setTimeout(res, ms));

export async function scrapeCompanyCareers(url, companyName) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        // Set a random user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Respect rate limits 1 request per second
        await delay(1000);

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Basic extraction heuristic if specific selectors aren't applied.
        // Real implementation would have exact selectors per company (Razorpay, CRED etc).
        const jobs = await page.evaluate(() => {
            // Find typical job link patterns
            const links = Array.from(document.querySelectorAll('a'));
            return links
                .filter(link => link.href.includes('job') || link.href.includes('career') || link.href.includes('role'))
                .map(link => ({
                    title: link.innerText || link.textContent,
                    url: link.href
                }))
                .filter(job => job.title.length > 5 && job.title.length < 100); // Filter out generic links
        });

        return jobs.map(job => ({
            ...job,
            company: companyName,
            source: `WebScraper_${companyName}`,
            fetchTime: new Date()
        }));

    } catch (error) {
        console.error(`Error scraping ${companyName}:`, error.message);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}

export async function runAllWebScrapers() {
    console.log('Running web scrapers...');
    const companies = [
        { name: 'Razorpay', url: 'https://razorpay.com/jobs/' },
        { name: 'CRED', url: 'https://careers.cred.club/' }
    ];

    let allJobs = [];
    for (const company of companies) {
        const jobs = await scrapeCompanyCareers(company.url, company.name);
        allJobs = allJobs.concat(jobs);
    }

    return allJobs;
}
