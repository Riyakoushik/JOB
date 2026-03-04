import React, { useState, useEffect } from 'react';
import { Play, Database, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Button } from './ui';

export default function AdminPanelTab({ showToast }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scraping, setScraping] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/logs');
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } catch (err) {
            console.error(err);
            showToast('Failed to fetch logs', 'error');
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchLogs();
    }, []);

    const triggerScrape = async () => {
        setScraping(true);
        try {
            const res = await fetch('/api/admin/scrape', { method: 'POST' });
            if (res.ok) {
                showToast('Data pipeline started in the background.', 'success');
                setTimeout(fetchLogs, 5000); // refresh logs after 5s
            }
        } catch (err) {
            showToast('Failed to trigger scraper', 'error');
        }
        setScraping(false);
    };

    return (
        <div className="space-y-6 animate-fade-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Database className="text-blue-400" />
                        Data Operations
                    </h2>
                    <p className="text-zinc-400 mt-1">Monitor scrapers and trigger manual data pipeline runs</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={fetchLogs} disabled={loading} className="border-white/10 text-white hover:bg-white/5">
                        Refresh Logs
                    </Button>
                    <Button
                        onClick={triggerScrape}
                        disabled={scraping}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-blue-500/20"
                    >
                        {scraping ? 'Starting...' : <><Play size={16} className="mr-2" /> Run Pipeline</>}
                    </Button>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-1">
                <div className="bg-black/40 rounded-xl overflow-x-auto">
                    <table className="w-full text-sm text-left align-middle text-zinc-300">
                        <thead className="text-xs text-zinc-400 uppercase bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Time</th>
                                <th className="px-6 py-4 font-semibold">Source</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Jobs Added</th>
                                <th className="px-6 py-4 font-semibold">Errors</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logs.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-zinc-500">No logs available</td></tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <Clock size={14} className="text-zinc-500" />
                                            {new Date(log.runTime).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">{log.source}</td>
                                        <td className="px-6 py-4">
                                            {log.status === 'SUCCESS' ? (
                                                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">
                                                    <CheckCircle2 size={14} /> Success
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full w-fit whitespace-nowrap">
                                                    <AlertCircle size={14} /> Error
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">{log.jobsAdded}</td>
                                        <td className="px-6 py-4 text-xs text-red-300 max-w-xs truncate">{log.errors || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
