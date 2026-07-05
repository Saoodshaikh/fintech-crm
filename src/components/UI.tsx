import { ReactNode } from "react";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" }}
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
      style={{ backgroundColor: color + "1A", color }}
    >
      {children}
    </span>
  );
}

const STATUS_COLORS: Record<string, string> = {
  Active: "#16A34A",
  "KYC Pending": "#D97706",
  Inactive: "#64748B",
  Success: "#16A34A",
  Pending: "#D97706",
  Failed: "#DC2626",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge color={STATUS_COLORS[status] || "#64748B"}>{status}</Badge>;
}

export function KpiCard({
  label, value, icon: Icon, accent, trend,
}: { label: string; value: string; icon: LucideIcon; accent: string; trend?: string }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className="p-2.5 rounded-xl" style={{ backgroundColor: accent + "10" }}>
          <Icon size={20} style={{ color: accent }} />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-xs font-semibold text-brand-success">
          <ArrowUpRight size={14} /> {trend}
        </div>
      )}
    </Card>
  );
}

export function Button({ 
  children, variant = "primary", className = "", ...props 
}: { children: ReactNode; variant?: "primary" | "outline" | "ghost"; className?: string; [key: string]: any }) {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all outline-none";
  const variants = {
    primary: "bg-brand-primary text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primaryDark",
    outline: "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  
  return (
    <motion.button 
      whileTap={{ scale: 0.96 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
