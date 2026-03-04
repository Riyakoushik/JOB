import * as React from 'react';
import {
    Search, Bookmark, MapPin, Users, Clock, Shield, Flame, Zap,
    Sparkles, BarChart3, X, Eye, Building2, TrendingUp
} from 'lucide-react';
import {
    Button, Card, CardHeader, CardTitle, CardDescription, CardContent,
    Badge, Input, MatchScoreCircle
} from './ui';
import { MOCK_JOBS, ROLE_GROUPS, BLOCKED_KEYWORDS } from '../data/constants';
import { calcATSScore, detectRoleGroup } from '../lib/ats';
import { useDebounce } from '../hooks/useHooks';
import { cn } from '../lib/utils';

// ===== ATS ANALYSIS PANEL (SHADCN STYLE) =====
function ATSPanel({ job, onClose }) {
    const analysis = calcATSScore(job.skills, job.title);

    return (
        <div className="mt-6 p-6 rounded-xl bg-zinc-950 border border-white/5 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold flex items-center gap-2 text-white">
                    <BarChart3 size={18} className="text-blue-500" /> ATS Match Analysis
                </h4>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                    <X size={16} />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/5">
                    <MatchScoreCircle score={analysis.rawScore} size="lg" />
                    <p className="mt-4 font-bold text-white">Match Score</p>
                </div>

                <div className="md:col-span-2 space-y-4">
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Matched Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {analysis.exactMatches.map(s => <Badge key={s} variant="verified">{s}</Badge>)}
                            {analysis.exactMatches.length === 0 && <span className="text-xs text-zinc-600">None</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Missing / Area for Improvement</p>
                        <div className="flex flex-wrap gap-1.5">
                            {analysis.missingSkills.map(s => <Badge key={s} variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20">{s}</Badge>)}
                            {analysis.missingSkills.length === 0 && <span className="text-xs text-zinc-600">Perfect Match!</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <p className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <Sparkles size={14} /> Recommended Action
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    {analysis.rawScore > 80
                        ? "Your profile is a strong match. We recommend applying immediately and reaching out to the hiring manager via LinkedIn."
                        : "Consider highlighting your 'McKinsey Forward' achievements to compensate for missing technical skills."}
                </p>
            </div>
        </div>
    );
}

// ===== JOB CARD (PREMIUM DARK MODE) =====
function JobCard({ job, isSaved, onToggleSave, index }) {
    const [showATS, setShowATS] = React.useState(false);
    const analysis = calcATSScore(job.skills, job.title);
    const rGroup = detectRoleGroup(job.title);
    const isHot = job.postedHoursAgo <= 6;

    return (
        <Card className="group relative overflow-hidden bg-[#1a1a1a] border-white/5">
            <CardHeader className="pb-4 pt-7 px-6">
                <div className="flex items-start justify-between">
                    <div className="flex gap-5">
                        {/* Company Logo Box */}
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-3xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-transform duration-300">
                            {rGroup.icon}
                        </div>

                        <div className="min-w-0 space-y-1">
                            <CardTitle className="text-xl font-bold text-white transition-colors leading-tight truncate">
                                {job.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Building2 size={16} className="text-zinc-600" />
                                <span className="font-semibold text-sm tracking-tight">{job.company}</span>
                                {job.isVerified && (
                                    <div className="bg-blue-500/10 text-blue-400 rounded-full p-0.5 border border-blue-500/20">
                                        <Shield size={10} fill="currentColor" className="opacity-80" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleSave}
                        className={cn(
                            "h-11 w-11 rounded-xl bg-white/5 border border-white/5 text-zinc-500 hover:text-blue-400 transition-all",
                            isSaved && "text-blue-400 bg-blue-400/10 border-blue-400/20"
                        )}
                    >
                        <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                    </Button>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mt-5">
                    {isHot && (
                        <Badge variant="hot" className="px-3 py-1 gap-1.5 h-7">
                            <Flame size={14} /> HOT
                        </Badge>
                    )}
                    {job.isEasyApply && (
                        <Badge variant="easy" className="px-3 py-1 gap-1.5 h-7">
                            <Zap size={14} fill="currentColor" /> Easy Apply
                        </Badge>
                    )}
                    {job.applicantCount < 10 && (
                        <Badge variant="early" className="px-3 py-1 gap-1.5 h-7">
                            <Sparkles size={14} className="text-orange-400" /> Early Applicant
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-6 pb-6 space-y-5">
                {/* Job Metadata */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                        <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">
                            <MapPin size={12} className="text-zinc-400" />
                        </div>
                        {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <div className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp size={12} />
                        </div>
                        {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                        <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">
                            <Users size={12} className="text-zinc-400" />
                        </div>
                        {job.applicantCount} applicants
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                        <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">
                            <Clock size={12} className="text-zinc-400" />
                        </div>
                        {job.postedHoursAgo}h ago
                    </div>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map(s => (
                        <Badge key={s} variant="secondary" className="bg-[#242424] border-white/5 text-zinc-300 font-bold px-3 py-1 h-7">
                            {s}
                        </Badge>
                    ))}
                    {job.skills.length > 4 && (
                        <div className="flex items-center justify-center h-7 px-2 text-[10px] font-black bg-white/5 text-zinc-500 rounded-md">
                            +{job.skills.length - 4}
                        </div>
                    )}
                </div>

                {/* Match & Actions Section */}
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                    <div className="flex items-center gap-4 py-2 px-3 rounded-2xl bg-white/[0.03] border border-white/5">
                        <MatchScoreCircle score={analysis.rawScore} size="sm" />
                        <div className="space-y-0.5">
                            <div className="text-xs font-black text-white tracking-tight">{analysis.rawScore}% Match</div>
                            <div className="text-[10px] text-zinc-500 font-medium">
                                {analysis.exactMatches.length}/{job.skills.length} skills matched
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="default"
                            onClick={() => setShowATS(!showATS)}
                            className="bg-white/5 border-white/10 hover:bg-white/10 h-10 px-4 gap-2 font-bold"
                        >
                            <Eye size={16} />
                            {showATS ? 'Hide' : 'Analyze'}
                        </Button>
                        <Button
                            variant="apply"
                            size="default"
                            onClick={() => window.open(job.applyUrl || '#', '_blank')}
                            className="bg-blue-600 hover:bg-blue-500 text-white animate-glow-blue h-10 px-5 gap-2 font-black shadow-lg shadow-blue-500/20"
                        >
                            <Zap size={16} fill="currentColor" />
                            Apply
                        </Button>
                    </div>
                </div>

                {showATS && <ATSPanel job={job} onClose={() => setShowATS(false)} />}
            </CardContent>
        </Card>
    );
}

// ===== MAIN TAB (SHADCN STYLE) =====
export default function JobSearchTab({ savedJobs, setSavedJobs, showToast }) {
    const [apiJobs, setApiJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [q, setQ] = React.useState('');
    const [roleFilters, setRoleFilters] = React.useState([]);
    const debouncedQ = useDebounce(q);

    React.useEffect(() => {
        fetch('/api/jobs')
            .then(r => r.json())
            .then(d => {
                const mapped = (d.data || [])
                    .filter(j => {
                        const allKeywords = Object.values(ROLE_GROUPS).flatMap(g => g.keywords);
                        const title = j.title.toLowerCase();
                        return allKeywords.some(k => title.includes(k.toLowerCase())) && !BLOCKED_KEYWORDS.some(k => title.includes(k.toLowerCase()));
                    })
                    .slice(0, 15).map((j, i) => ({
                        id: `api-${i}`, title: j.title, company: j.company_name, location: j.location || 'Remote',
                        salary: j.remote ? 'Remote' : 'On-site', skills: (j.tags || []).slice(0, 5),
                        isVerified: true, postedHoursAgo: Math.floor(Math.random() * 48), applyUrl: j.url,
                        source: 'Arbeitnow', applicantCount: Math.floor(Math.random() * 100), isEasyApply: Math.random() > 0.5,
                        description: j.description || ''
                    }));
                setApiJobs(mapped);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const allJobs = [...MOCK_JOBS, ...apiJobs];
    const filtered = allJobs.filter(j => {
        if (debouncedQ && !j.title.toLowerCase().includes(debouncedQ.toLowerCase()) && !j.skills.some(s => s.toLowerCase().includes(debouncedQ.toLowerCase()))) return false;
        const roleGroup = detectRoleGroup(j.title).name;
        if (roleFilters.length > 0 && !roleFilters.includes(roleGroup)) return false;
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

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
                    filtered.map((job, index) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            index={index}
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
