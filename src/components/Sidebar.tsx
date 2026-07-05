import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, PieChart, Briefcase, FileText, Bell,
  Settings, LogOut,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/funds", label: "Mutual Funds", icon: PieChart },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-60 shrink-0 h-screen flex flex-col fixed left-0 top-0 z-20 bg-brand-primary">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-brand-primary">
          F
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-none">FinVest CRM</div>
          <div className="text-[10px] leading-none mt-1 text-blue-100/80">Smart Investment Platform</div>
        </div>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "bg-white text-brand-primary" : "text-blue-50/90 hover:bg-white/10"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-50/90 hover:bg-white/10"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
