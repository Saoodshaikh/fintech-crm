import { Search, Bell, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { marketData, notifications } from "../data/dummyData";

export default function Topbar({ title }: { title: string }) {
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      {/* Market Ticker */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-1.5 flex items-center gap-6 overflow-x-auto">
        {marketData.map((m) => (
          <div key={m.name} className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {m.name}
            </span>
            <span className="text-xs font-bold text-slate-900">{m.value}</span>
            <span
              className={`flex items-center gap-0.5 text-[10px] font-semibold ${
                m.up ? "text-green-600" : "text-red-500"
              }`}
            >
              {m.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {m.pct}
            </span>
          </div>
        ))}
        <div className="ml-auto shrink-0 text-[10px] text-slate-400">
          Live · NSE
        </div>
      </div>

      {/* Main Topbar */}
      <div className="h-14 flex items-center justify-between px-6">
        <h1 className="text-base font-bold text-slate-900">{title}</h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              placeholder="Search clients, funds..."
              className="pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50 w-56 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/40 transition-all"
            />
          </div>

          {/* Notifications */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Bell size={18} className="text-slate-500" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-[#0F4C81]">
              RM
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-900 leading-none">Rahul Mehta</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Financial Advisor</div>
            </div>
            <ChevronDown size={13} className="text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
