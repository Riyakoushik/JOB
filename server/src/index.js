import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { runScoringPipeline, startCron } from './cron/scheduler.js';
import { scoreJobMatch } from './engine/atsMatcher.js';
import { scrapeLinkedInRecruiters, findEmail } from './scrapers/hrScraper.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Start the 6-hour cron
startCron();

// API ROUTES

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Job Portal API is running' });
});

// Get all jobs, with optional matching based on user profile
app.post('/api/jobs', async (req, res) => {
    try {
        const { userProfile, category, location } = req.body;

        // Build where clause
        const where = {};
        if (category && category !== 'All Roles') where.category = { contains: category, mode: 'insensitive' };
        if (location && location !== 'All India') where.location = { contains: location, mode: 'insensitive' };

        const dbJobs = await prisma.job.findMany({
            where,
            orderBy: { postedAt: 'desc' },
            take: 100
        });

        const jobs = dbJobs.map(j => ({ ...j, skills: JSON.parse(j.skills || "[]") }));

        if (userProfile && Object.keys(userProfile).length > 0) {
            // Apply ATS matching
            const scoredJobs = jobs.map(job => {
                const matchResult = scoreJobMatch(userProfile, job);
                return { ...job, atsScore: matchResult.matchScore, atsReport: matchResult.report };
            });
            // Sort by score
            scoredJobs.sort((a, b) => b.atsScore - a.atsScore);
            return res.json(scoredJobs);
        }

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Trigger manual scraper run (for Admin Panel)
app.post('/api/admin/scrape', async (req, res) => {
    try {
        // Run async to not block
        runScoringPipeline();
        res.json({ message: 'Scraping pipeline started' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Scraper Logs
app.get('/api/admin/logs', async (req, res) => {
    try {
        const logs = await prisma.scraperLog.findMany({
            orderBy: { runTime: 'desc' },
            take: 50
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch HR Contacts
app.get('/api/hr', async (req, res) => {
    try {
        const contacts = await prisma.hRContact.findMany({
            orderBy: { lastUpdated: 'desc' }
        });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Trigger HR Scraper for a specific company
app.post('/api/hr/scrape', async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) return res.status(400).json({ error: 'Company name required' });

        const profiles = await scrapeLinkedInRecruiters(companyName);

        let addedCount = 0;
        for (const p of profiles) {
            // Find email
            const domain = companyName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'; // basic guess
            const email = await findEmail(domain, p.name.split(' ')[0], p.name.split(' ')[1] || '');

            try {
                await prisma.hRContact.upsert({
                    where: { linkedin: p.linkedin },
                    update: { email, lastUpdated: new Date() },
                    create: { ...p, email }
                });
                addedCount++;
            } catch (err) { }
        }

        res.json({ message: `Scraped and added ${addedCount} recruiters for ${companyName}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
