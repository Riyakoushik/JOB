import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../lib/utils"

// ===== BUTTON =====
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
                destructive: "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
                outline: "border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                secondary: "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
                ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
                premium: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 animate-gradient bg-[length:200%_auto] font-bold border-none",
                apply: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] border-none font-black tracking-wide transition-all duration-200",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                xl: "h-12 rounded-xl px-10 text-base",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

// ===== CARD =====
const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 card-premium",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

// ===== BADGE =====
const badgeVariants = cva(
    "inline-flex items-center rounded-md border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800",
    {
        variants: {
            variant: {
                default: "border-transparent bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80",
                secondary: "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
                destructive: "border-transparent bg-red-500 text-zinc-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
                outline: "text-zinc-950 dark:text-zinc-50",
                hot: "bg-gradient-to-r from-orange-500 to-red-600 text-white border-none shadow-lg animate-glow-orange font-bold uppercase tracking-wider",
                easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-glow-green",
                early: "bg-zinc-800 text-zinc-300 border-white/5 font-medium",
                verified: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

// ===== INPUT =====
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

// ===== SEPARATOR =====
const Separator = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "shrink-0 bg-zinc-200 dark:bg-zinc-800",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
        )}
        {...props}
    />
))
Separator.displayName = "Separator"

// ===== AVATAR (Simplified) =====
const Avatar = ({ children, className }) => (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white/10", className)}>
        <div className="flex h-full w-full items-center justify-center font-medium uppercase text-zinc-900 dark:text-zinc-50">
            {children}
        </div>
    </div>
)

// ===== MATCH SCORE CIRCLE =====
function MatchScoreCircle({ score, size = "md" }) {
    const color = score >= 90 ? '#34d399' :
        score >= 75 ? '#3b82f6' :
            score >= 60 ? '#fbbf24' : '#ef4444';

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
function StatItem({ icon: Icon, label, value, trend }) {
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

// ===== TOAST (Simplified) =====
function Toast({ show, message, type = 'success', onClose }) {
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

export { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Input, Separator, Avatar, MatchScoreCircle, StatItem, Toast }
