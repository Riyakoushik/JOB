import cron from 'node-cron';
import { fetchAllApiJobs } from '../scrapers/apiScrapers.js';
import { fetchAllRssJobs } from '../scrapers/rssScrapers.js';
import { runAllWebScrapers } from '../scrapers/webScrapers.js';
import { normalizeJobData, deduplicateJobs } from '../pipeline/normalizer.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function runScoringPipeline() {
    console.log(`[${new Date().toISOString()}] Starting Data Pipeline...`);
    try {
        const apiJobs = await fetchAllApiJobs();
        const rssJobs = await fetchAllRssJobs();
        const webJobs = await runAllWebScrapers();

        const allJobs = [...apiJobs, ...rssJobs, ...webJobs];
        console.log(`Fetched ${allJobs.length} raw jobs`);

        const normalized = normalizeJobData(allJobs);
        const deduped = deduplicateJobs(normalized);
        console.log(`After normalization and dedup: ${deduped.length} distinct jobs`);

        // Attempt inserting into DB
        let newJobsCount = 0;
        for (const job of deduped) {
            try {
                const dbJob = { ...job, skills: JSON.stringify(job.skills) };
                await prisma.job.upsert({
                    where: { url: dbJob.url },
                    update: {
                        fetchTime: new Date()
                    },
                    create: dbJob
                });
                newJobsCount++;
            } catch (e) { /* ignore constraint errs etc */ }
        }

        console.log(`[${new Date().toISOString()}] Data Pipeline finished. Inserted/Updated ${newJobsCount} jobs.`);

        await prisma.scraperLog.create({
            data: {
                source: 'Cron Pipeline',
                status: 'SUCCESS',
                jobsAdded: newJobsCount
            }
        });

    } catch (error) {
        console.error('Data pipeline error:', error);
        await prisma.scraperLog.create({
            data: {
                source: 'Cron Pipeline',
                status: 'ERROR',
                errors: error.message
            }
        });
    }
}

// Run every 6 hours
export function startCron() {
    console.log('Starting node-cron scheduler (every 6 hours)');
    cron.schedule('0 */6 * * *', () => {
        runScoringPipeline();
    });
}
