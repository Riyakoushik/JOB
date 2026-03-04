import * as React from 'react';
import {
    FileText, Upload, Trash2, Edit3, ClipboardList, Sparkles, CheckCircle, BarChart, X
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, MatchScoreCircle, Separator } from './ui';

export default function ResumeTab({ savedNotes, setSavedNotes }) {
    return (
        <div className="space-y-8 animate-fade-in">
            <Card className="bg-gradient-to-br from-zinc-900 to-black border-white/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                <CardContent className="pt-8 pb-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 shadow-2xl">
                        <FileText size={40} />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">Thalari_Koushik_APM_Resume.pdf</h3>
                        <p className="text-sm text-zinc-500">91 KB • Updated Mar 2, 2026 • ATS Score: 87/100</p>
                        <div className="flex gap-2 justify-center md:justify-start pt-2">
                            <Button size="sm" variant="outline" className="border-white/5 bg-white/5"><Upload size={14} className="mr-2" /> Replace</Button>
                            <Button size="sm" variant="ghost" className="text-zinc-600 hover:text-red-400"><Trash2 size={14} className="mr-2" /> Delete</Button>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 pr-4">
                        <Separator orientation="vertical" className="h-16 opacity-50" />
                        <div className="flex flex-col items-center">
                            <MatchScoreCircle score={87} size="lg" />
                            <span className="text-[10px] font-bold text-zinc-600 uppercase mt-2">ATS Quality</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-900/40">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Edit3 size={18} className="text-purple-500" /> Improvement Notes
                        </CardTitle>
                        <CardDescription>Contextual notes generated from job analyses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {savedNotes.length === 0 ? (
                            <p className="text-sm text-zinc-600 italic">No notes captured yet. Use 'Analyze' on job cards to save tips.</p>
                        ) : (
                            savedNotes.map(n => (
                                <div key={n.id} className="p-4 rounded-xl bg-black/40 border border-white/5 group relative">
                                    <p className="text-xs font-bold text-blue-400 mb-1 leading-none">{n.company}</p>
                                    <p className="text-sm text-zinc-300 pr-6">{n.text}</p>
                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSavedNotes(savedNotes.filter(x => x.id !== n.id))}>
                                        <X size={12} />
                                    </Button>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900/40">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Sparkles size={18} className="text-amber-500" /> Pro Tips
                        </CardTitle>
                        <CardDescription>Maximize your conversion for APM roles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            "Quantify your McKinsey Forward program impact.",
                            "Highlight experience with AI tools (Claude, Manus).",
                            "Include exact keywords: OKR, PRD, RICE.",
                            "Lead with impact verbs: 'Reduced...','Built...','Scales...'"
                        ].map((t, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-zinc-400">{t}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
