import React, { useState } from 'react';
import { RefreshCw, Database, CheckCircle2, Clock, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BLOCKED_KEYWORDS } from '@/data/constants';

// Re-use the same fetch logic as JobSearchTab
async function fetchJobCounts() {
    const results = { arbeitnow: 0, remotive: 0, errors: [] };

    const [arbRes, remRes] = await Promise.allSettled([
        fetch('https://www.arbeitnow.com/api/job-board-api').then(r => {
            if (!r.ok) throw new Error('Arbeitnow failed');
            return r.json();
        }),
        fetch('https://remotive.com/api/remote-jobs').then(r => {
            if (!r.ok) throw new Error('Remotive failed');
            return r.json();
        }),
    ]);

    if (arbRes.status === 'fulfilled' && arbRes.value?.data) {
        const filtered = arbRes.value.data.filter(j => {
            const lower = (j.title || '').toLowerCase();
            return !BLOCKED_KEYWORDS.some(kw => lower.includes(kw));
        });
        results.arbeitnow = filtered.length;
    } else {
        results.errors.push('Arbeitnow API unavailable');
    }

    if (remRes.status === 'fulfilled' && remRes.value?.jobs) {
        const filtered = remRes.value.jobs.filter(j => {
            const lower = (j.title || '').toLowerCase();
            return !BLOCKED_KEYWORDS.some(kw => lower.includes(kw));
        });
        results.remotive = filtered.length;
    } else {
        results.errors.push('Remotive API unavailable');
    }

    return results;
}

export default function AdminPanelTab({ showToast }) {
    const [lastFetched, setLastFetched] = useState(null);
    const [stats, setStats] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const result = await fetchJobCounts();
            setStats(result);
            setLastFetched(new Date());
            const total = result.arbeitnow + result.remotive;
            if (total > 0) {
                showToast(`Fetched ${total} jobs (${result.arbeitnow} Arbeitnow + ${result.remotive} Remotive)`);
            } else {
                showToast('No jobs fetched — APIs may be unavailable', 'error');
            }
        } catch {
            showToast('Failed to refresh jobs', 'error');
        }
        setRefreshing(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Database className="text-blue-400" />
                        Data Operations
                    </h2>
                    <p className="text-zinc-400 mt-1">Fetch live jobs from free public APIs</p>
                </div>

                <Button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-blue-500/20"
                >
                    {refreshing ? (
                        <><RefreshCw size={16} className="mr-2 animate-spin" /> Refreshing...</>
                    ) : (
                        <><RefreshCw size={16} className="mr-2" /> Refresh Jobs</>
                    )}
                </Button>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-[#1a1a1a] border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Clock size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Last Fetched</p>
                            <p className="text-sm font-bold text-white">
                                {lastFetched ? lastFetched.toLocaleString() : 'Not yet fetched'}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-[#1a1a1a] border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Globe size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Jobs Found</p>
                            <p className="text-sm font-bold text-white">
                                {stats ? (stats.arbeitnow + stats.remotive) : '—'}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-[#1a1a1a] border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <Zap size={20} className="text-purple-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">API Status</p>
                            <p className="text-sm font-bold text-white">
                                {stats ? (stats.errors.length === 0 ? 'All Online' : `${stats.errors.length} Error(s)`) : '—'}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* API Source Details */}
            {stats && (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-1">
                    <div className="bg-black/40 rounded-xl overflow-x-auto">
                        <table className="w-full text-sm text-left align-middle text-zinc-300">
                            <thead className="text-xs text-zinc-400 uppercase bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Source</th>
                                    <th className="px-6 py-4 font-semibold">Jobs Found</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">Arbeitnow</td>
                                    <td className="px-6 py-4">{stats.arbeitnow}</td>
                                    <td className="px-6 py-4">
                                        {stats.errors.some(e => e.includes('Arbeitnow')) ? (
                                            <Badge className="bg-red-400/10 text-red-400 border-red-400/20">Offline</Badge>
                                        ) : (
                                            <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
                                                <CheckCircle2 size={12} className="mr-1" /> Online
                                            </Badge>
                                        )}
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">Remotive</td>
                                    <td className="px-6 py-4">{stats.remotive}</td>
                                    <td className="px-6 py-4">
                                        {stats.errors.some(e => e.includes('Remotive')) ? (
                                            <Badge className="bg-red-400/10 text-red-400 border-red-400/20">Offline</Badge>
                                        ) : (
                                            <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
                                                <CheckCircle2 size={12} className="mr-1" /> Online
                                            </Badge>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
