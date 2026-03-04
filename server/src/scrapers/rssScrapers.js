import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchRemoteOKJobs() {
    try {
        const feed = await parser.parseURL('https://remoteok.com/remote-jobs.rss');
        return feed.items.map(item => ({
            title: item.title,
            company: item.creator || 'Unknown',
            source: 'RemoteOK',
            category: 'Remote',
            url: item.link,
            description: item.contentSnippet,
            postedAt: new Date(item.pubDate)
        }));
    } catch (error) {
        console.error('Error fetching RemoteOK RSS:', error.message);
        return [];
    }
}

export async function fetchAllRssJobs() {
    console.log('Fetching from RSS Feeds...');
    const remoteOk = await fetchRemoteOKJobs();
    return [...remoteOk];
}
