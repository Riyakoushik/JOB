import * as React from 'react';
import {
    User, Briefcase, GraduationCap, Award, MapPin, Mail, Phone,
    Linkedin, Shield, Sparkles, TrendingUp, ChevronRight, Settings,
    Globe, Copy, Check, Rocket, AtSign, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { USER_PROFILE, ROLE_GROUPS } from '@/data/constants';

export default function MyProfileTab() {
    const [copied, setCopied] = React.useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(USER_PROFILE.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const initials = USER_PROFILE.name
        .split(' ')
        .map(n => n[0])
        .join('');

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header / Hero Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <Card className="bg-zinc-950 border-white/10 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -ml-48 -mb-48 animate-pulse" style={{ animationDelay: '2s' }} />

                    <CardContent className="pt-12 pb-12 flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                        <div className="relative">
                            <Avatar className="h-32 w-32 bg-gradient-to-br from-zinc-800 to-zinc-950 text-4xl font-black border-2 border-white/10 ring-8 ring-white/5 shadow-2xl">
                                {initials}
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center border-4 border-zinc-950 shadow-lg animate-bounce">
                                <Sparkles size={18} className="text-white fill-white/20" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="space-y-1">
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                    <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">{USER_PROFILE.name}</h2>
                                    <Badge variant="verified" className="w-fit mx-auto md:mx-0 py-1 px-3">
                                        <Shield size={12} className="mr-1.5" /> VERIFIED TALENT
                                    </Badge>
                                </div>
                                <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-wide">
                                    {USER_PROFILE.title}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-sm font-medium">
                                <span className="flex items-center gap-2 text-zinc-400"><MapPin size={16} className="text-zinc-600" /> {USER_PROFILE.location}</span>
                                <div className="flex items-center gap-2 group/email cursor-pointer" onClick={copyEmail}>
                                    <Mail size={16} className="text-zinc-600" />
                                    <span className="text-zinc-400 group-hover:text-blue-400 transition-colors uppercase tracking-wider text-[11px] font-black">{USER_PROFILE.email}</span>
                                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-zinc-700 group-hover:text-zinc-500 opacity-0 group-hover:opacity-100 transition-all" />}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-4">
                                <Button className="bg-white text-black hover:bg-zinc-200 font-black tracking-wide text-xs px-6 py-5 rounded-xl shadow-xl shadow-white/5 group" onClick={() => window.open(`https://${USER_PROFILE.linkedin}`, '_blank')}>
                                    <Linkedin size={16} className="mr-2" /> LINKEDIN PRO
                                    <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-50 transition-all" />
                                </Button>
                                <Button variant="outline" className="border-white/10 text-zinc-300 font-black tracking-wide text-xs px-6 py-5 rounded-xl hover:bg-white/5 transition-all group" onClick={() => window.open(`https://${USER_PROFILE.website}`, '_blank')}>
                                    <Globe size={16} className="mr-2" /> PORTFOLIO
                                    <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-50 transition-all" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (Main Info) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Achievements */}
                    <Card className="bg-zinc-900/40 border-white/5 border shadow-inner">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-white flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-glow-emerald">
                                    <Award size={18} />
                                </div>
                                Notable Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {USER_PROFILE.achievements.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group">
                                        <div className="flex gap-4">
                                            <div className="text-emerald-500 font-black text-xl opacity-20 group-hover:opacity-60 transition-opacity">0{idx + 1}</div>
                                            <p className="text-xs font-bold leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase tracking-tight">{item}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education & Certs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-[#0a0a0a] border-white/5">
                            <CardHeader className="pb-3 border-b border-white/5 mb-4">
                                <CardTitle className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <GraduationCap size={14} /> Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative pl-6 border-l-2 border-zinc-800 py-1">
                                    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-blue-600 border-4 border-zinc-950 shadow-[0_0_15px_#3b82f6]" />
                                    <h4 className="text-sm font-black text-white">{USER_PROFILE.education.split(' – ')[0]}</h4>
                                    <p className="text-xs font-bold text-blue-400 mt-1 uppercase tracking-wider">{USER_PROFILE.education.split(' – ')[1]}</p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <Badge className="bg-zinc-900 text-[10px] font-black">{USER_PROFILE.education.split(' – ')[2]}</Badge>
                                        <Badge variant="outline" className="text-[10px] font-black border-white/5">{USER_PROFILE.education.split(' – ')[3]}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#0a0a0a] border-white/5">
                            <CardHeader className="pb-3 border-b border-white/5 mb-4">
                                <CardTitle className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <BadgeCheck size={14} className="text-blue-500" /> Certifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {USER_PROFILE.certifications.map((cert, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 cursor-pointer group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-8 h-8 shrink-0 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                <Shield size={16} />
                                            </div>
                                            <p className="text-[11px] font-black text-zinc-400 group-hover:text-white transition-colors uppercase tracking-tight truncate">
                                                {cert.split(' – ')[0]}
                                            </p>
                                        </div>
                                        <ChevronRight size={14} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Master Skill Cloud */}
                    <Card className="bg-zinc-950 border-white/10 shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                            <div>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Rocket size={18} className="text-orange-500" /> Skill Stack
                                </CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mt-1">Cross-functional expertise</CardDescription>
                            </div>
                            <Badge variant="outline" className="text-zinc-500 font-mono text-[10px]">{USER_PROFILE.resumeSkills.length} SKILLS</Badge>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-2">
                                {USER_PROFILE.resumeSkills.map(skill => (
                                    <Badge
                                        key={skill}
                                        className="bg-zinc-900 border-white/5 text-zinc-400 px-4 py-2 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 font-black text-[10px] uppercase tracking-wider cursor-default shadow-lg shadow-black/20"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column (Side Panels) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Career Focus */}
                    <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-white/10 overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-[0_0_15px_#3b82f6]" />
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <AtSign size={18} className="text-blue-500" /> Target Tracks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(ROLE_GROUPS).slice(0, 4).map(([name, config]) => (
                                <div key={name} className="group cursor-pointer">
                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all border border-transparent group-hover:border-white/5 shadow-inner">
                                        <div className="flex items-center gap-4">
                                            <div className="text-xl">{config.icon}</div>
                                            <div className="space-y-0.5">
                                                <p className="text-xs font-black text-white uppercase tracking-tight">{name}</p>
                                                <p className="text-[10px] font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase">{config.keywords[0]} + {config.keywords.length - 1} more</p>
                                            </div>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#3b82f6] transition-all" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Preferences & Blocklist */}
                    <Card className="bg-[#050505] border-white/5">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Settings size={14} className="text-zinc-600" /> Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 bg-emerald-500 rounded-full" />
                                        <span className="text-[11px] font-bold text-zinc-400 uppercase">Remote Only</span>
                                    </div>
                                    <Badge variant="verified" className="text-[9px]">ACTIVE</Badge>
                                </div>
                                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 bg-blue-500 rounded-full" />
                                        <span className="text-[11px] font-bold text-zinc-400 uppercase">Intern-Ready</span>
                                    </div>
                                    <Badge variant="secondary" className="text-[9px] bg-blue-400/10 text-blue-400">OPEN</Badge>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                    <Shield size={12} /> Auto-Blocklist
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {USER_PROFILE.blockedKeywords.slice(0, 5).map(k => (
                                        <Badge
                                            key={k}
                                            variant="outline"
                                            className="text-[9px] font-bold border-red-500/10 text-zinc-700 bg-red-500/5 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-default"
                                        >
                                            {k}
                                        </Badge>
                                    ))}
                                    <Badge variant="outline" className="text-[9px] font-bold border-zinc-800 text-zinc-800">+{USER_PROFILE.blockedKeywords.length - 5} MORE</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Help Icon component for BadgeCheck if not available in lucide
function BadgeCheck({ size, className }) {
    return <Award size={size} className={className} />;
}
