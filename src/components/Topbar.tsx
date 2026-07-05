import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 sticky top-0 z-10 bg-white">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            placeholder="Search clients, funds..."
            className="pl-9 pr-4 py-2 rounded-xl text-sm border border-slate-200 bg-brand-bg w-64 outline-none focus:ring-2 focus:ring-brand-secondary/40"
          />
        </div>
        <button className="relative p-2 rounded-xl hover:bg-slate-100">
          <Bell size={18} className="text-slate-500" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-danger" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-brand-secondary">
            RM
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-slate-900">Rahul Mehta</div>
            <div className="text-xs text-slate-500">Financial Advisor</div>
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
      </div>
    </header>
  );
}
