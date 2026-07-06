import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Users, Cake } from "lucide-react";
import Layout from "../components/Layout";
import { Card, StatusBadge } from "../components/UI";
import { calendarEvents } from "../data/dummyData";

const EVENT_STYLES: Record<string, { bg: string; text: string; dot: string; icon: any }> = {
  Meeting: { bg: "bg-blue-50", text: "text-blue-700", dot: "#2563EB", icon: CalendarDays },
  SIP: { bg: "bg-amber-50", text: "text-amber-700", dot: "#D97706", icon: Clock },
  Birthday: { bg: "bg-green-50", text: "text-green-700", dot: "#16A34A", icon: Cake },
  "Follow-up": { bg: "bg-purple-50", text: "text-purple-700", dot: "#8B5CF6", icon: Users },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6); // July = 6

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  // All events for the current month sorted by date
  const monthEvents = calendarEvents
    .filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const upcomingEvents = monthEvents.slice(0, 8);

  return (
    <Layout title="Calendar">
      <div className="p-6 space-y-5">
        {/* Legend */}
        <div className="flex items-center gap-6 flex-wrap">
          {Object.entries(EVENT_STYLES).map(([type, style]) => (
            <div key={type} className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: style.dot }} />
              {type}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Calendar Grid */}
          <Card className="lg:col-span-2">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft size={18} className="text-slate-500" />
              </button>
              <h2 className="text-base font-bold text-slate-900">
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ChevronRight size={18} className="text-slate-500" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Day Cells */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for first day offset */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[80px]" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const events = getEventsForDay(day);
                const isTodayCell = isToday(day);

                return (
                  <div
                    key={day}
                    className={`min-h-[80px] rounded-xl p-1.5 border transition-colors ${
                      isTodayCell
                        ? "bg-blue-50 border-brand-primary"
                        : events.length > 0
                        ? "bg-slate-50 border-slate-200 hover:border-slate-300"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                        isTodayCell
                          ? "bg-brand-primary text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {events.slice(0, 2).map((e, ei) => {
                        const style = EVENT_STYLES[e.type] || EVENT_STYLES.Meeting;
                        return (
                          <div
                            key={ei}
                            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md truncate ${style.bg} ${style.text}`}
                            title={e.title}
                          >
                            {e.title.split("—")[0].trim()}
                          </div>
                        );
                      })}
                      {events.length > 2 && (
                        <div className="text-[9px] text-slate-400 px-1">+{events.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Events List */}
          <div className="space-y-4">
            <Card>
              <div className="font-semibold text-slate-900 mb-4">
                Events in {MONTHS[month]}
              </div>
              <div className="space-y-3">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm">No events this month</div>
                ) : (
                  upcomingEvents.map((e, i) => {
                    const style = EVENT_STYLES[e.type] || EVENT_STYLES.Meeting;
                    const Icon = style.icon;
                    return (
                      <div key={i} className={`flex gap-3 p-3 rounded-xl border ${style.bg}`}>
                        <div className="mt-0.5 shrink-0">
                          <Icon size={15} style={{ color: style.dot }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-900 truncate">{e.title}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            {e.time && ` · ${e.time}`}
                          </div>
                        </div>
                        <div className="ml-auto shrink-0">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                          >
                            {e.type}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <div className="font-semibold text-slate-900 mb-3">Month Summary</div>
              <div className="space-y-2">
                {Object.entries(EVENT_STYLES).map(([type, style]) => {
                  const count = monthEvents.filter((e) => e.type === type).length;
                  const Icon = style.icon;
                  return (
                    <div key={type} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color: style.dot }} />
                        <span className="text-xs text-slate-600">{type}s</span>
                      </div>
                      <div className={`text-sm font-bold ${style.text}`}>{count}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
