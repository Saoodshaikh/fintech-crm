import { ReactNode, forwardRef } from "react";
import { LucideIcon, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({
  children,
  className = "",
  onClick,
  noPad = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  noPad?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={
        onClick
          ? { y: -2, boxShadow: "0 12px 28px -5px rgba(15,76,129,0.12)" }
          : { y: -2, boxShadow: "0 8px 20px -5px rgba(0,0,0,0.07)" }
      }
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 transition-all ${
        noPad ? "" : "p-6"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({
  children,
  color,
  size = "sm",
}: {
  children: ReactNode;
  color: string;
  size?: "sm" | "xs";
}) {
  return (
    <span
      className={`rounded-full font-semibold inline-flex items-center gap-1 ${
        size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
      style={{ backgroundColor: color + "18", color }}
    >
      {children}
    </span>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  Active: "#16A34A",
  "KYC Pending": "#D97706",
  Inactive: "#64748B",
  Success: "#16A34A",
  Pending: "#D97706",
  Failed: "#DC2626",
  Verified: "#16A34A",
  Paused: "#8B5CF6",
  High: "#DC2626",
  Medium: "#D97706",
  Low: "#16A34A",
  "Due Today": "#DC2626",
  Upcoming: "#2563EB",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge color={STATUS_COLORS[status] || "#64748B"}>{status}</Badge>;
}

// ── Risk Badge ────────────────────────────────────────────────────────────────
const RISK_COLORS: Record<string, string> = {
  Low: "#16A34A",
  Moderate: "#2563EB",
  High: "#D97706",
  "Very High": "#DC2626",
  Conservative: "#16A34A",
  Aggressive: "#DC2626",
};

export function RiskBadge({ risk }: { risk: string }) {
  const color = RISK_COLORS[risk] || "#64748B";
  return <Badge color={color}>{risk} Risk</Badge>;
}

// ── Riskometer ────────────────────────────────────────────────────────────────
export function Riskometer({ risk }: { risk: string }) {
  const levels = ["Low", "Moderate", "High", "Very High"];
  const idx = levels.indexOf(risk);
  const colors = ["#16A34A", "#2563EB", "#D97706", "#DC2626"];
  return (
    <div>
      <div className="flex gap-1 h-2">
        {levels.map((l, i) => (
          <div
            key={l}
            className="flex-1 rounded-full"
            style={{ backgroundColor: i <= idx ? colors[idx] : "#E2E8F0" }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] mt-1 text-slate-400">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
        <span>Very High</span>
      </div>
    </div>
  );
}

// ── KPI Card ──────────────────────────────────────────────────────────────────
export function KpiCard({
  label,
  value,
  icon: Icon,
  accent,
  trend,
  trendUp,
  sub,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string;
  trend?: string;
  trendUp?: boolean;
  sub?: string;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-500 leading-tight">{label}</span>
        <div className="p-2 rounded-xl shrink-0" style={{ backgroundColor: accent + "12" }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
      {(trend || sub) && (
        <div className="flex items-center gap-1">
          {trend && (
            <div
              className={`flex items-center gap-0.5 text-xs font-semibold ${
                trendUp === false ? "text-red-500" : "text-green-600"
              }`}
            >
              {trendUp === false ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
              {trend}
            </div>
          )}
          {sub && <span className="text-xs text-slate-400">{sub}</span>}
        </div>
      )}
    </Card>
  );
}

// ── Button ────────────────────────────────────────────────────────────────────
export function Button({
  children,
  variant = "primary",
  className = "",
  size = "md",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger" | "success";
  className?: string;
  size?: "sm" | "md" | "lg";
  [key: string]: any;
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
  };
  const vars = {
    primary: "bg-brand-primary text-white shadow-sm shadow-brand-primary/20 hover:bg-brand-primaryDark",
    outline: "border border-slate-200 text-slate-700 hover:border-brand-primary/30 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    success: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`flex items-center justify-center gap-2 rounded-xl font-medium transition-all outline-none ${sizes[size]} ${vars[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
>(({ label, error, className = "", ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs font-medium text-slate-700">{label}</label>}
    <input
      ref={ref}
      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${
        error
          ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200"
          : "border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
      } ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
));
Input.displayName = "Input";

// ── Select ────────────────────────────────────────────────────────────────────
export function Select({
  label,
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-slate-700">{label}</label>}
      <select
        className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 bg-white ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────────
export function Textarea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-slate-700">{label}</label>}
      <textarea
        className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit flex-wrap">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            active === t
              ? "bg-white text-brand-primary shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
const TIMELINE_COLORS: Record<string, string> = {
  onboarding: "#0F4C81",
  kyc: "#16A34A",
  sip: "#2563EB",
  investment: "#D97706",
  review: "#8B5CF6",
  followup: "#64748B",
};

export function Timeline({
  events,
}: {
  events: Array<{ date: string; event: string; type: string; detail?: string }>;
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
      <div className="space-y-4">
        {events.map((e, i) => {
          const color = TIMELINE_COLORS[e.type] || "#64748B";
          return (
            <div key={i} className="flex gap-4 relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10"
                style={{ backgroundColor: color + "18", border: `2px solid ${color}30` }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              </div>
              <div className="pb-4">
                <div className="text-xs font-medium text-slate-400 mb-0.5">{e.date}</div>
                <div className="text-sm font-semibold text-slate-900">{e.event}</div>
                {e.detail && <div className="text-xs text-slate-500 mt-1">{e.detail}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Document Card ─────────────────────────────────────────────────────────────
export function DocumentCard({
  name,
  type,
  size,
  date,
  status,
}: {
  name: string;
  type: string;
  size: string;
  date: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-brand-primary/20 hover:bg-slate-50 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{size} · {date}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {status === "Verified" ? (
          <CheckCircle2 size={14} className="text-green-500" />
        ) : (
          <AlertCircle size={14} className="text-amber-500" />
        )}
        <span className="text-xs text-slate-500 mr-2">{status}</span>
        <Button variant="outline" size="sm">View</Button>
        <Button variant="outline" size="sm">↓</Button>
      </div>
    </div>
  );
}

// ── Stat Row ──────────────────────────────────────────────────────────────────
export function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-brand-success" : "text-slate-900"}`}>
        {value}
      </span>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
export function Avatar({
  name,
  size = "md",
  color = "#0F4C81",
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base", xl: "w-16 h-16 text-lg" };
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Icon size={24} className="text-slate-400" />
      </div>
      <div className="font-semibold text-slate-700">{title}</div>
      <div className="text-sm text-slate-400 mt-1">{desc}</div>
    </div>
  );
}
