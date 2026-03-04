import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

// ===== MATCH SCORE CIRCLE =====
export function MatchScoreCircle({ score, size = "md" }) {
    const color = score >= 90 ? '#34d399' : // emerald-400
        score >= 75 ? '#3b82f6' :           // blue-500
            score >= 60 ? '#fbbf24' : '#ef4444';    // amber-400 / red-500

    const dim = size === "sm" ? 36 : size === "lg" ? 64 : 48;
    const stroke = size === "sm" ? 3 : size === "lg" ? 5 : 4;

    return (
        <div className="relative flex items-center justify-center font-bold" style={{ width: dim, height: dim }}>
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={stroke * 2}
                />
                <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke * 2}
                    strokeDasharray={`${score * 2.83} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <span className="relative z-10 text-[10px]" style={{ fontSize: size === "sm" ? '8px' : size === "lg" ? '14px' : '10px', color }}>{score}%</span>
        </div>
    );
}

// ===== STAT CARD (SHADCN STYLE) =====
export function StatItem({ icon: Icon, label, value, trend }) {
    return (
        <Card className="p-4 bg-zinc-900/40 border-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-white/5">
                    <Icon size={18} className="text-zinc-400" />
                </div>
                {trend && <div className="text-[10px] font-bold text-emerald-400">{trend}</div>}
            </div>
            <div className="mt-3">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>
        </Card>
    )
}

// ===== TOAST =====
export function Toast({ show, message, type = 'success', onClose }) {
    React.useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed bottom-24 md:bottom-8 right-8 z-[100] animate-fade-in-up">
            <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl",
                type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
            )}>
                <div className={cn("w-2 h-2 rounded-full", type === 'success' ? "bg-emerald-500" : "bg-red-500")} />
                <span className="text-sm font-bold tracking-tight">{message}</span>
            </div>
        </div>
    );
}
