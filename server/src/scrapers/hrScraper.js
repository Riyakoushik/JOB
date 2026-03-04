import puppeteer from 'puppeteer';
import axios from 'axios';

// Generic delay function for rate limiting
const delay = ms => new Promise(res => setTimeout(res, ms));

export async function scrapeLinkedInRecruiters(companyName) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Instead of logging into LinkedIn (which requires auth and risks bans), 
        // a common approach is to search Google for public LinkedIn profiles.
        const query = encodeURIComponent(`site:linkedin.com/in/ "recruiter" OR "talent acquisition" "${companyName}" India`);
        await page.goto(`https://www.google.com/search?q=${query}`, { waitUntil: 'domcontentloaded' });

        await delay(2000); // Rate limit

        const results = await page.evaluate((company) => {
            const links = Array.from(document.querySelectorAll('a'));
            const profiles = [];

            for (const link of links) {
                if (link.href && link.href.includes('linkedin.com/in/')) {
                    const titleEl = link.querySelector('h3');
                    if (titleEl) {
                        const fullTitle = titleEl.innerText;
                        // E.g., "John Doe - Talent Acquisition - Razorpay | LinkedIn"
                        const name = fullTitle.split('-')[0].trim();
                        profiles.push({
                            name: name,
                            linkedin: link.href,
                            company: company,
                            role: 'Recruiter / Talent Acquisition'
                        });
                    }
                }
            }
            return profiles;
        }, companyName);

        // Deduplicate profiles
        const uniqueProfiles = [];
        const seenUrls = new Set();
        for (const p of results) {
            // clean URL from Google tracking params
            let cleanUrl = p.linkedin;
            try {
                const urlObj = new URL(p.linkedin);
                cleanUrl = urlObj.searchParams.get('url') || p.linkedin;
                // Basic cleanup
                cleanUrl = cleanUrl.split('?')[0];
            } catch (e) { }

            if (!seenUrls.has(cleanUrl) && cleanUrl.includes('linkedin.com/in/')) {
                seenUrls.add(cleanUrl);
                uniqueProfiles.push({ ...p, linkedin: cleanUrl });
            }
        }

        return uniqueProfiles.slice(0, 5); // Return top 5

    } catch (error) {
        console.error(`Error scraping recruiters for ${companyName}:`, error.message);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}

// Dummy/Hunter.io integration for finding emails
export async function findEmail(domain, firstName, lastName) {
    // If Hunter API key is provided, use it. Otherwise, return a generic/dummy email.
    const apiKey = process.env.HUNTER_API_KEY;
    if (!apiKey) {
        // Generate a placeholder email
        return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    }

    try {
        const response = await axios.get(`https://api.hunter.io/v2/email-finder?domain=${domain}&first_name=${firstName}&last_name=${lastName}&api_key=${apiKey}`);
        if (response.data && response.data.data && response.data.data.email) {
            return response.data.data.email;
        }
    } catch (error) {
        console.error(`Error finding email for ${domain}:`, error.message);
    }
    return null;
}
