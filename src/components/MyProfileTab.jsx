import * as React from 'react';
import {
    User, Briefcase, GraduationCap, Award, MapPin, Mail, Phone,
    Linkedin, Shield, Sparkles, TrendingUp, ChevronRight, Settings
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Avatar, Separator } from './ui';
import { USER_PROFILE, ROLE_GROUPS } from '../data/constants';

export default function MyProfileTab() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Profile Hero */}
            <Card className="bg-gradient-to-br from-zinc-900 to-black border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />

                <CardContent className="pt-10 pb-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <Avatar className="h-28 w-28 bg-gradient-to-br from-zinc-800 to-black text-3xl font-bold border-white/5 ring-8 ring-white/5">
                        TK
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div>
                            <h2 className="text-3xl font-extrabold text-white tracking-tight">{USER_PROFILE.name}</h2>
                            <p className="text-blue-400 font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                                <Sparkles size={16} /> Aspiring Product Manager
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-zinc-500 font-medium">
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {USER_PROFILE.location}</span>
                            <span className="flex items-center gap-1.5"><Mail size={14} /> {USER_PROFILE.email}</span>
                            <span className="flex items-center gap-1.5"><Phone size={14} /> {USER_PROFILE.phone}</span>
                        </div>

                        <div className="flex gap-2 justify-center md:justify-start pt-2">
                            <Button size="sm" className="bg-white text-black hover:bg-zinc-200">Edit Profile</Button>
                            <Button size="sm" variant="outline">Share Link</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Skill Cloud */}
                    <Card className="bg-zinc-900/40">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500" /> Professional Skills
                            </CardTitle>
                            <CardDescription>Core competencies and domain expertise</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {Object.entries(ROLE_GROUPS).map(([name, config]) => (
                                <div key={name} className="space-y-3">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <span className="text-base">{config.icon}</span> {name}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {config.keywords.slice(0, 6).map(k => (
                                            <Badge key={k} variant="secondary" className="bg-white/5 border-white/5 text-zinc-300 px-3 py-1 hover:bg-white/10 cursor-default transition-colors">
                                                {k}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Education & Certificates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-zinc-900/40">
                            <CardHeader>
                                <CardTitle className="text-sm text-white flex items-center gap-2 tracking-wide uppercase">
                                    <GraduationCap size={16} className="text-zinc-500" /> Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative pl-4 border-l border-zinc-800 pb-2">
                                    <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-blue-500" />
                                    <p className="text-sm font-bold text-white">B.Tech - Computer Science</p>
                                    <p className="text-xs text-zinc-500">Tier 1 Institute • 2021 - 2025</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-900/40">
                            <CardHeader>
                                <CardTitle className="text-sm text-white flex items-center gap-2 tracking-wide uppercase">
                                    <Award size={16} className="text-zinc-500" /> Certificates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Shield size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white leading-none">McKinsey Forward</p>
                                            <p className="text-[10px] text-zinc-600 mt-1">Foundation Level</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-700" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="space-y-8">
                    <Card className="bg-zinc-900/40 border-blue-500/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Rocket size={18} className="text-blue-500" /> Target Tracks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {['Product Track', 'Project Track', 'AI Track'].map(t => (
                                <div key={t} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
                                    <span className="text-sm font-bold text-zinc-300">{t}</span>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/40">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Settings size={18} className="text-zinc-500" /> Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Remote Only</span>
                                <Badge variant="verified">ENABLED</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Open to Internships</span>
                                <Badge variant="secondary">YES</Badge>
                            </div>
                            <Separator className="opacity-50" />
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-zinc-600 uppercase">Blocked Keywords</p>
                                <div className="flex flex-wrap gap-1">
                                    {['BPO', 'Sales', 'Telecaller'].map(k => (
                                        <Badge key={k} variant="outline" className="text-[10px] border-white/5 text-zinc-600 line-through decoration-red-500/50">{k}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
