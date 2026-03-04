import React, { useState } from 'react';
import { Bookmark, MapPin, Users, Clock, Shield, Flame, Zap, Sparkles, Building2, TrendingUp, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchScoreCircle } from '@/components/ui/custom';
import { detectRoleGroup, calcATSScore } from '@/lib/ats';
import { cn } from '@/lib/utils';
import { ATSPanel } from './ATSPanel';

export function JobCard({ job, isSaved, onToggleSave }) {
    const [showATS, setShowATS] = useState(false);
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
                                {analysis.exactMatches.length}/{job.skills.length || 0} skills matched
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
