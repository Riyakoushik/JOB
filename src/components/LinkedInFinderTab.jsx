import * as React from 'react';
import {
    Briefcase, Flame, Building2, ClipboardList, BarChart3, TrendingUp, Users, Search, Globe,
    FileText, Edit3, Sparkles, Zap, ExternalLink, Link2, Clock, Rocket
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from './ui';

export default function LinkedInFinderTab({ showToast }) {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');

    const links = [
        { l: 'Product Analyst', i: Briefcase, u: 'https://www.linkedin.com/jobs/search/?keywords=Product+Analyst&f_E=1&sortBy=DD' },
        { l: 'APM Remote', i: Globe, u: 'https://www.linkedin.com/jobs/search/?keywords=Associate+Product+Manager&f_WT=2&f_E=1&sortBy=DD' },
        { l: 'Project Intern', i: ClipboardList, u: 'https://www.linkedin.com/jobs/search/?keywords=Project+Coordinator+Intern&f_WT=2&sortBy=DD' },
        { l: 'Business Analyst', i: BarChart3, u: 'https://www.linkedin.com/jobs/search/?keywords=Business+Analyst&f_WT=2&f_E=1&sortBy=DD' },
    ];

    const build = () => {
        let base = 'https://www.linkedin.com/jobs/search/?f_WT=2&';
        if (title) base += `keywords=${encodeURIComponent(title)}&`;
        base += 'sortBy=DD';
        setUrl(base);
        showToast('Search URL Generated');
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {links.map((l, i) => (
                    <Card key={i} className="hover:border-blue-500/30 transition-all cursor-pointer group" onClick={() => window.open(l.u, '_blank')}>
                        <CardContent className="pt-6 pb-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                <l.i size={20} />
                            </div>
                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">{l.l}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-zinc-900/40 border-white/5">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Link2 size={20} className="text-blue-500" /> Custom Search Builder
                    </CardTitle>
                    <CardDescription>Generate targeted LinkedIn job URLs instantly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Target Job Title..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="bg-zinc-950 border-white/10"
                    />
                    <div className="flex gap-3">
                        <Button onClick={build} variant="apply">
                            <Sparkles size={16} className="mr-2" />
                            Build Magic URL
                        </Button>
                        {url && (
                            <Button variant="outline" onClick={() => window.open(url, '_blank')}>
                                <ExternalLink size={16} className="mr-2" />
                                Launch Search
                            </Button>
                        )}
                    </div>
                    {url && (
                        <div className="p-3 bg-zinc-950 rounded-lg border border-white/5 text-[10px] font-mono text-zinc-600 break-all">
                            {url}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
