import React from 'react';
import { BarChart3, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchScoreCircle } from '@/components/ui/custom';
import { calcATSScore } from '@/lib/ats';

export function ATSPanel({ job, onClose }) {
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
                <div className="text-xs text-zinc-400 leading-relaxed">
                    {analysis.recommendations && analysis.recommendations.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1">
                            {analysis.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ul>
                    ) : analysis.rawScore > 80 ? (
                        <p>Your profile is a strong match. We recommend applying immediately and reaching out to the hiring manager via LinkedIn.</p>
                    ) : (
                        <p>Consider highlighting your 'McKinsey Forward' achievements to compensate for missing technical skills.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
