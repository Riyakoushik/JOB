import * as React from 'react';
import {
    Briefcase, Calendar, Award, Clock, Plus, X, Trash2, Filter, ChevronRight
} from 'lucide-react';
import {
    Button, Card, CardHeader, CardTitle, CardDescription, CardContent,
    Badge, Input, Separator, StatItem
} from './ui';

export default function ApplicationsTab({ apps, setApps, showToast }) {
    const [showForm, setShowForm] = React.useState(false);
    const [form, setForm] = React.useState({
        title: '', company: '', date: new Date().toISOString().split('T')[0], status: 'Applied', match: 80
    });

    const stats = [
        { l: 'Total Applied', v: apps.length, i: Briefcase, trend: '+3 this week' },
        { l: 'Interviews', v: apps.filter(a => a.status.includes('Interview')).length, i: Calendar, trend: '2 scheduled' },
        { l: 'Offers', v: apps.filter(a => a.status === 'Offered').length, i: Award, trend: 'Check emails!' },
        { l: 'Pending', v: apps.filter(a => ['Applied', 'Viewed'].includes(a.status)).length, i: Clock, trend: 'Wait for response' },
    ];

    const saveApp = () => {
        if (!form.title || !form.company) return;
        setApps([{ ...form, id: `app-${Date.now()}` }, ...apps]);
        setShowForm(false); showToast('Application tracked!');
        setForm({ title: '', company: '', date: new Date().toISOString().split('T')[0], status: 'Applied', match: 80 });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatItem key={i} icon={s.i} label={s.l} value={s.v} trend={s.trend} />
                ))}
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Application History <Badge variant="secondary">{apps.length}</Badge>
                </h2>
                <Button onClick={() => setShowForm(!showForm)} className="bg-white text-black hover:bg-zinc-200">
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    <span className="hidden sm:inline ml-2">{showForm ? 'Cancel' : 'Add Application'}</span>
                </Button>
            </div>

            {showForm && (
                <Card className="animate-fade-in-up border-blue-500/20 shadow-lg shadow-blue-500/5">
                    <CardHeader>
                        <CardTitle className="text-white">Track New Opportunity</CardTitle>
                        <CardDescription>Keep context of where you applied and when</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input placeholder="Job Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            <Input placeholder="Company *" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, status: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-800"
                            >
                                <option value="Applied">Applied</option>
                                <option value="Viewed">Viewed</option>
                                <option value="Interview Scheduled">Interview</option>
                                <option value="Assignment Sent">Assignment</option>
                                <option value="Offered">Offered</option>
                            </select>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button onClick={saveApp} variant="apply">Track Now</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Applications List */}
            <div className="space-y-3">
                {apps.length === 0 ? (
                    <Card className="p-12 text-center border-dashed border-zinc-800 bg-transparent">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                            <Briefcase size={20} className="text-zinc-600" />
                        </div>
                        <h3 className="text-zinc-400 font-medium">No applications found</h3>
                        <p className="text-xs text-zinc-600 mt-1">Start by applying to some jobs in the Discover tab</p>
                    </Card>
                ) : (
                    apps.map((a, i) => (
                        <Card key={a.id} className="group animate-fade-in-up hover:bg-zinc-900/50 transition-colors border-white/5">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5 font-bold text-zinc-400">
                                        {a.company[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white leading-none">{a.title}</h4>
                                        <p className="text-xs text-zinc-500 mt-1.5 flex items-center gap-2">
                                            {a.company} <span className="text-zinc-700 font-bold">•</span> {new Date(a.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="hidden md:block">
                                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right mb-1">ATS Score</p>
                                        <Badge variant="outline" className="font-mono">{a.match}%</Badge>
                                    </div>

                                    <div className="hidden sm:block min-w-[120px]">
                                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right mb-1">Status</p>
                                        <div className="flex justify-end">
                                            <Badge
                                                className={
                                                    a.status === 'Offered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        a.status.includes('Interview') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                            'bg-zinc-800 text-zinc-400'
                                                }
                                            >
                                                {a.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-500/5" onClick={() => setApps(apps.filter(x => x.id !== a.id))}>
                                            <Trash2 size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600">
                                            <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
