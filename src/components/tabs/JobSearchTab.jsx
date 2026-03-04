import * as React from 'react';
import {
    Search, Bookmark, MapPin, Users, Clock, Shield, Flame, Zap,
    Sparkles, BarChart3, X, Eye, Building2, TrendingUp
} from 'lucide-react';
import { MatchScoreCircle } from '@/components/ui/custom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MOCK_JOBS, ROLE_GROUPS, BLOCKED_KEYWORDS, USER_PROFILE } from '@/data/constants';
import { calcATSScore, detectRoleGroup } from '@/lib/ats';
import { useDebounce } from '@/hooks/useHooks';
import { cn, isEnglish } from '@/lib/utils';
import { JobCard } from '@/components/shared/JobCard';
import {
    fetchRemotive, fetchArbeitnow, fetchJobicy,
    fetchHimalayas, fetchInternshala, fetchGreenhouse,
    fetchLever, fetchAshby, fetchJSearch, fetchAdzuna
} from '@/lib/api/jobApis';
// ===== MAIN TAB (SHADCN STYLE) =====
export default function JobSearchTab({ savedJobs, setSavedJobs, showToast }) {
    const [apiJobs, setApiJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [q, setQ] = React.useState('');
    const [locationFilter, setLocationFilter] = React.useState('');
    const [typeFilters, setTypeFilters] = React.useState([]);
    const [roleFilters, setRoleFilters] = React.useState([]);
    const debouncedQ = useDebounce(q);

    React.useEffect(() => {
        const loadAllJobs = async () => {
            setLoading(true);
            try {
                // Run ALL sources in parallel for speed
                const [
                    remotiveJobs, arbeitnowJobs, jobicyJobs,
                    himalayasJobs, internshalaJobs,
                    greenhouseJobs, leverJobs, ashbyJobs,
                    jsearchJobs, adzunaJobs
                ] = await Promise.allSettled([
                    fetchRemotive(),
                    fetchArbeitnow(),
                    fetchJobicy(),
                    fetchHimalayas(),
                    fetchInternshala(),
                    fetchGreenhouse(),
                    fetchLever(),
                    fetchAshby(),
                    fetchJSearch(),
                    fetchAdzuna()
                ]);

                // Combine all results safely
                const getValue = (r) => r.status === 'fulfilled' ? r.value : [];
                const allJobs = [
                    ...getValue(remotiveJobs),
                    ...getValue(arbeitnowJobs),
                    ...getValue(jobicyJobs),
                    ...getValue(himalayasJobs),
                    ...getValue(internshalaJobs),
                    ...getValue(greenhouseJobs),
                    ...getValue(leverJobs),
                    ...getValue(ashbyJobs),
                    ...getValue(jsearchJobs),
                    ...getValue(adzunaJobs),
                ];

                // STEP 1: Remove duplicates by title + company
                const seen = new Set();
                const unique = allJobs.filter(j => {
                    const key = `${j.title}-${j.company}`.toLowerCase().trim();
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });

                // STEP 1.5: English Only Filter (Title and Description)
                const englishOnly = unique.filter(j => {
                    // Check title and short description (first 200 chars) for English
                    return isEnglish(j.title) && isEnglish(j.description?.slice(0, 200));
                });

                // STEP 2: Filter out blocked keywords
                const cleaned = englishOnly.filter(j => {
                    const titleLower = j.title.toLowerCase();
                    return !BLOCKED_KEYWORDS.some(k => titleLower.includes(k.toLowerCase()));
                });

                // STEP 3: Filter only recently posted (last 30 days)
                const recent = cleaned.filter(j => j.postedHoursAgo <= 720);

                // STEP 4: Run ATS score on each job
                const scored = recent.map(j => {
                    const analysis = calcATSScore(j.skills || [], j.title);
                    return {
                        ...j,
                        atsScore: analysis.rawScore,
                        applicantCount: j.applicantCount || Math.floor(Math.random() * 20)
                    };
                });

                // STEP 5: Sort by ATS score (best match first)
                scored.sort((a, b) => b.atsScore - a.atsScore);

                setApiJobs(scored);
                if (scored.length > 0) {
                    showToast(`✅ Loaded ${scored.length} jobs from ${new Set(scored.map(j => j.source)).size} sources!`, 'success');
                }

            } catch (err) {
                console.error('Job loading error:', err);
                showToast('Could not load jobs fully. Showing partial data.', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadAllJobs();
    }, []); // Only fetch on mount

    // Fallback to MOCK_JOBS if APIs returned nothing
    const allJobs = apiJobs.length > 0 ? apiJobs : MOCK_JOBS;

    // Client-side filtering for text search, location, type, and role groups
    const filtered = allJobs.filter(j => {
        const titleLower = j.title.toLowerCase();
        const companyLower = j.company.toLowerCase();
        const locationLower = j.location.toLowerCase();
        const descLower = (j.description || '').toLowerCase();
        const skillsLower = (j.skills || []).map(s => s.toLowerCase());

        // Text search filter
        if (debouncedQ && !titleLower.includes(debouncedQ.toLowerCase()) && !companyLower.includes(debouncedQ.toLowerCase())) return false;

        // Role group filter
        if (roleFilters.length > 0) {
            const roleGroup = detectRoleGroup(j.title).name;
            if (!roleFilters.includes(roleGroup)) return false;
        }

        // Location Filter
        if (locationFilter && !locationLower.includes(locationFilter.toLowerCase())) return false;

        // Type Filter (detect from title, skills, or description)
        if (typeFilters.length > 0) {
            const hasType = typeFilters.some(t => {
                const target = t.toLowerCase();
                return titleLower.includes(target) ||
                    skillsLower.some(s => s.includes(target)) ||
                    (target === 'intern' && descLower.includes('internship'));
            });
            if (!hasType) return false;
        }

        return true;
    });

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <Input
                        type="text"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search by job title, skill, or company..."
                        className="pl-12 h-14 text-base bg-zinc-900/50 backdrop-blur-sm border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="relative flex-grow sm:flex-grow-0 sm:min-w-[200px]">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <Input
                            type="text"
                            value={locationFilter}
                            onChange={e => setLocationFilter(e.target.value)}
                            placeholder="Filter by city/remote..."
                            className="pl-10 h-10 text-sm bg-zinc-900/40 border-white/5"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-grow">
                        {['Intern', 'Full-time', 'Contract'].map(type => (
                            <Button
                                key={type}
                                variant={typeFilters.includes(type) ? "default" : "outline"}
                                size="xs"
                                onClick={() => {
                                    if (typeFilters.includes(type)) setTypeFilters(typeFilters.filter(t => t !== type));
                                    else setTypeFilters([...typeFilters, type]);
                                }}
                                className="border-white/5 bg-zinc-900/40"
                            >
                                {type}
                            </Button>
                        ))}
                        {(locationFilter || typeFilters.length > 0 || roleFilters.length > 0) && (
                            <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => { setLocationFilter(''); setTypeFilters([]); setRoleFilters([]); }}
                                className="text-red-400 hover:text-red-300 ml-auto"
                            >
                                <X size={14} className="mr-1" /> Clear
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-t border-white/5 pt-4">
                    <Button
                        variant={roleFilters.length === 0 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setRoleFilters([])}
                        className="rounded-full"
                    >
                        All Roles
                    </Button>
                    {Object.entries(ROLE_GROUPS).map(([name, config]) => (
                        <Button
                            key={name}
                            variant={roleFilters.includes(name) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                if (roleFilters.includes(name)) setRoleFilters(roleFilters.filter(r => r !== name));
                                else setRoleFilters([...roleFilters, name]);
                            }}
                            className="rounded-full font-bold"
                        >
                            {config.icon} {name.replace(' Track', '')}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Recommended Jobs <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-none">{filtered.length}</Badge>
                </h2>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-500">Hide Ignored</Button>
                    <Button variant="ghost" size="sm" className="text-zinc-500 font-bold">Latest First</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                {loading ? [1, 2, 3, 4].map(i => <Card key={i} className="h-64 skeleton opacity-50" />) :
                    filtered.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobs.some(s => s.id === job.id)}
                            onToggleSave={() => {
                                if (savedJobs.some(s => s.id === job.id)) { setSavedJobs(savedJobs.filter(s => s.id !== job.id)); showToast('Removed from saved'); }
                                else { setSavedJobs([...savedJobs, job]); showToast('Job saved!'); }
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}
