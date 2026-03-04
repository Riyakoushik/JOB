import * as React from 'react';
import {
    Search, Plus, X, Copy, Mail, Linkedin, Building2, Check
} from 'lucide-react';
import {
    Button, Card, CardHeader, CardTitle, CardDescription, CardContent,
    Badge, Input, Avatar, Separator
} from './ui';
import { useDebounce } from '../hooks/useHooks';
import { USER_PROFILE } from '../data/constants';

export default function HRContactsTab({ hrContacts, setHrContacts, showToast }) {
    const [q, setQ] = React.useState('');
    const [showAdd, setShowAdd] = React.useState(false);
    const [form, setForm] = React.useState({
        name: '', company: '', designation: '', email: '', phone: '', linkedinUrl: '', roleHiring: ''
    });
    const debouncedQ = useDebounce(q);

    const filtered = hrContacts.filter(h => {
        if (debouncedQ && !h.name.toLowerCase().includes(debouncedQ.toLowerCase()) && !h.company.toLowerCase().includes(debouncedQ.toLowerCase())) return false;
        return true;
    });

    const saveHR = () => {
        if (!form.name || !form.company || !form.email) return;
        setHrContacts([{ ...form, id: `h-${Date.now()}`, isVerified: true, avatarColor: '#3b82f6' }, ...hrContacts]);
        setShowAdd(false); setForm({ name: '', company: '', designation: '', email: '', phone: '', linkedinUrl: '', roleHiring: '' });
        showToast('HR Contact Added!');
    };

    const copy = (txt, lbl) => { navigator.clipboard.writeText(txt); showToast(`${lbl} copied`); };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full max-w-lg relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <Input
                        type="text"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search by company or name..."
                        className="pl-11 bg-zinc-900/50 border-white/10"
                    />
                </div>
                <Button onClick={() => setShowAdd(!showAdd)} className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600">
                    {showAdd ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                    {showAdd ? 'Cancel' : 'Add HR Contact'}
                </Button>
            </div>

            {showAdd && (
                <Card className="animate-fade-in-up bg-zinc-900/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-white">New HR Contact</CardTitle>
                        <CardDescription>Add a recruiter to your direct outreach list</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            <Input placeholder="Company *" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                            <Input placeholder="Designation" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
                            <Input placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            <Input placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={e => setForm({ ...form, linkedinUrl: e.target.value })} />
                            <Input placeholder="Hiring for role..." value={form.roleHiring} onChange={e => setForm({ ...form, roleHiring: e.target.value })} />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button onClick={saveHR} variant="apply">Save Recruiter</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((h, i) => (
                    <Card key={h.id} className="animate-fade-in-up hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 text-sm">
                                    {h.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-base text-white flex items-center gap-2 truncate">
                                        {h.name}
                                        {h.isVerified && <Check size={12} className="text-blue-400 bg-blue-500/10 rounded-full p-0.5 shrink-0" />}
                                    </CardTitle>
                                    <CardDescription className="truncate text-zinc-500">{h.designation}</CardDescription>
                                    <div className="text-xs font-bold text-blue-400 mt-1">{h.company}</div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {h.roleHiring && (
                                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                    <Building2 size={14} className="text-blue-500 shrink-0" />
                                    <span className="text-xs text-blue-300 font-medium">Hiring: {h.roleHiring.replace('Hiring ', '')}</span>
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="flex items-center justify-between group/email">
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 truncate">
                                        <Mail size={14} className="shrink-0" />
                                        <span className="truncate">{h.email}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover/email:opacity-100 transition-opacity" onClick={() => copy(h.email, 'Email')}>
                                        <Copy size={12} />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between group/linkedin">
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 truncate">
                                        <Linkedin size={14} className="shrink-0" />
                                        <span className="truncate">View Profile</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover/linkedin:opacity-100 transition-opacity" onClick={() => window.open(h.linkedinUrl, '_blank')}>
                                        <Plus size={12} className="rotate-45" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>

                        <Separator className="opacity-50" />

                        <CardContent className="pt-4 pb-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => window.location.href = `mailto:${h.email}?subject=Interested in ${h.roleHiring || 'Product'} Role`}>
                                    <Mail size={14} className="mr-2" />
                                    Email
                                </Button>
                                <Button variant="apply" size="sm" className="flex-1" onClick={() => window.open(h.linkedinUrl, '_blank')}>
                                    <Linkedin size={14} className="mr-2" />
                                    Connect
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
