import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, PieChart, Briefcase, FileText, Bell,
  Settings, LogOut, CalendarDays, TrendingUp, IndianRupee,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/clients", label: "Clients", icon: Users },
    ],
  },
  {
    label: "Investments",
    items: [
      { to: "/funds", label: "Mutual Funds", icon: PieChart },
      { to: "/portfolio", label: "Portfolio", icon: Briefcase },
      { to: "/reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Tools",
    items: [
      { to: "/calendar", label: "Calendar", icon: CalendarDays },
      { to: "/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 h-screen flex flex-col fixed left-0 top-0 z-20 bg-[#0F4C81]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-[#0F4C81] text-sm shadow">
          FV
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-none">FinVest CRM</div>
          <div className="text-[10px] leading-none mt-1 text-blue-100/60">Smart Investment Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="text-[9px] font-bold uppercase tracking-widest text-blue-200/40 px-3 mb-1.5">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white text-[#0F4C81] shadow-sm"
                        : "text-blue-50/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon size={17} className="shrink-0" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Advisor Card */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/8 mb-1">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0F4C81] font-bold text-xs shrink-0">
            RM
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">Rahul Mehta</div>
            <div className="text-blue-100/60 text-[10px]">Financial Advisor</div>
          </div>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-50/80 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
