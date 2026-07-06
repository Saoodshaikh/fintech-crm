import { useState } from "react";
import {
  TrendingUp, Clock, AlertCircle, Cake, Shield, Bell, CheckCheck,
  CalendarDays, Filter,
} from "lucide-react";
import Layout from "../components/Layout";
import { Card, Badge } from "../components/UI";
import { notifications } from "../data/dummyData";

const iconMap: Record<string, { icon: any; color: string }> = {
  "Market Update": { icon: TrendingUp, color: "#2563EB" },
  "SIP Due": { icon: Clock, color: "#D97706" },
  "KYC Pending": { icon: AlertCircle, color: "#DC2626" },
  "Birthday Reminder": { icon: Cake, color: "#16A34A" },
  "Portfolio Alert": { icon: AlertCircle, color: "#0F4C81" },
  "Meeting Reminder": { icon: CalendarDays, color: "#8B5CF6" },
};

const FILTER_TABS = ["All", "SIP", "KYC", "Alerts", "Birthday", "Market"];

const filterMap: Record<string, string[]> = {
  All: [],
  SIP: ["SIP Due"],
  KYC: ["KYC Pending"],
  Alerts: ["Portfolio Alert"],
  Birthday: ["Birthday Reminder"],
  Market: ["Market Update", "Meeting Reminder"],
};

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [readState, setReadState] = useState<Record<number, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.id, n.read]))
  );

  const filtered = notifications.filter((n) => {
    if (activeFilter === "All") return true;
    return filterMap[activeFilter]?.includes(n.type);
  });

  const grouped = {
    Today: filtered.filter((n) => n.date === "Today"),
    Yesterday: filtered.filter((n) => n.date === "Yesterday"),
    Earlier: filtered.filter((n) => n.date === "2 days ago"),
  };

  const unread = Object.values(readState).filter((v) => !v).length;

  const markAllRead = () => {
    setReadState(Object.fromEntries(notifications.map((n) => [n.id, true])));
  };

  return (
    <Layout title="Notifications">
      <div className="p-6 space-y-5 max-w-3xl">
        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
            {FILTER_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === t
                    ? "bg-white text-brand-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-500">{unread} unread</div>
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-brand-primary font-semibold hover:underline"
            >
              <CheckCheck size={14} /> Mark All Read
            </button>
          </div>
        </div>

        {/* Grouped Notifications */}
        {Object.entries(grouped).map(([group, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={group} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{group}</div>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <div className="space-y-2">
                {items.map((n) => {
                  const meta = iconMap[n.type] || { icon: Bell, color: "#64748B" };
                  const Icon = meta.icon;
                  const isRead = readState[n.id];

                  return (
                    <div
                      key={n.id}
                      onClick={() => setReadState((prev) => ({ ...prev, [n.id]: true }))}
                      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        isRead
                          ? "bg-white border-slate-100 hover:border-slate-200"
                          : "bg-blue-50/50 border-blue-100 hover:border-blue-200 shadow-sm"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className="p-2.5 rounded-xl shrink-0 mt-0.5"
                        style={{ backgroundColor: meta.color + "18" }}
                      >
                        <Icon size={16} style={{ color: meta.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <Badge color={meta.color} size="xs">{n.type}</Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                            {!isRead && (
                              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                            )}
                          </div>
                        </div>
                        <div className={`text-sm mt-1.5 leading-snug ${isRead ? "text-slate-600" : "text-slate-900 font-medium"}`}>
                          {n.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell size={40} className="mx-auto mb-3 text-slate-200" />
            <div className="font-medium text-slate-500">No notifications</div>
            <div className="text-xs text-slate-400 mt-1">You're all caught up!</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
