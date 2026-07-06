import { useNavigate } from "react-router-dom";
import {
  Users, Briefcase, TrendingUp, IndianRupee, AlertCircle, CheckCircle2,
  TrendingDown, Clock, DollarSign, Star, CalendarDays, UserPlus, Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import Layout from "../components/Layout";
import { Card, KpiCard, StatusBadge, Avatar, SectionHeader } from "../components/UI";
import { useCrm } from "../context/CrmContext";
import {
  growthData, allocationData, inr,
  topFunds, upcomingFollowUps, upcomingSips,
} from "../data/dummyData";

const activity = [
  { text: "Rahul Sharma completed KYC verification", time: "2 hours ago", icon: CheckCircle2, color: "#16A34A" },
  { text: "New SIP started for Priya Mehta — ₹25,000/month", time: "5 hours ago", icon: TrendingUp, color: "#2563EB" },
  { text: "Amit Patel's KYC is pending review", time: "1 day ago", icon: AlertCircle, color: "#D97706" },
  { text: "Karan Shah redeemed ₹1,20,000 from Axis Small Cap", time: "1 day ago", icon: TrendingDown, color: "#DC2626" },
  { text: "Portfolio review scheduled with Neha Verma", time: "2 days ago", icon: Clock, color: "#0F4C81" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-3 py-2.5 text-sm">
        <div className="font-semibold text-slate-900 mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-500">{p.name}:</span>
            <span className="font-semibold">{p.value}L</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { clients, transactions } = useCrm();

  const totalClients = clients.length;
  const totalAumVal = clients.reduce((sum, c) => sum + c.currentValue, 0);
  const totalAumText = totalAumVal >= 10000000 
    ? `₹${(totalAumVal / 10000000).toFixed(2)} Cr` 
    : `₹${(totalAumVal / 100000).toFixed(1)} L`;

  const todayInvAmount = transactions
    .filter((t) => t.date === "Today")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const todayTxnsCount = transactions.filter((t) => t.date === "Today").length;

  const kpis = [
    { label: "Total Clients", value: String(totalClients), icon: Users, accent: "#0F4C81", trend: "+8 this month", trendUp: true },
    { label: "Total AUM", value: totalAumText, icon: Briefcase, accent: "#2563EB", trend: "+12.4%", trendUp: true },
    { label: "Monthly SIP", value: "₹12.80 L", icon: TrendingUp, accent: "#16A34A", trend: "+3 new SIPs", trendUp: true },
    { label: "Today's Investment", value: todayInvAmount > 0 ? `₹${(todayInvAmount / 100000).toFixed(2)} L` : "₹0.00", icon: IndianRupee, accent: "#D97706", trend: `${todayTxnsCount} transactions` },
    { label: "Pending KYC", value: "18", icon: AlertCircle, accent: "#DC2626", trend: "-2 from last week", trendUp: false },
    { label: "Active Portfolios", value: "221", icon: CheckCircle2, accent: "#0F4C81", trend: "90.2% active" },
    { label: "Monthly Commission", value: "₹61,000", icon: DollarSign, accent: "#8B5CF6", trend: "+8.9% vs last month", trendUp: true },
    { label: "Today's SIP Due", value: "₹1.45 L", icon: Clock, accent: "#D97706", trend: "9 SIPs today" },
    { label: "Upcoming Renewals", value: "12", icon: CalendarDays, accent: "#2563EB", trend: "Next 30 days" },
    { label: "New Clients (Month)", value: "8", icon: UserPlus, accent: "#16A34A", trend: "+33% vs last month", trendUp: true },
    { label: "Revenue (Month)", value: "₹85,000", icon: Activity, accent: "#0F4C81", trend: "+15.2% growth", trendUp: true },
    { label: "Top Fund 1Y Return", value: "28.1%", icon: Star, accent: "#D97706", trend: "Nippon Small Cap" },
  ];


  return (
    <Layout title="Dashboard">
      <div className="p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2">
            <SectionHeader
              title="Investment Growth"
              subtitle="Last 7 months (₹ Lakhs)"
              action={
                <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600">
                  <option>7 Months</option>
                  <option>1 Year</option>
                </select>
              }
            />
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F4C81" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0F4C81" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="invested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="#0F4C81" strokeWidth={2.5} fill="url(#growth)" dot={{ fill: "#0F4C81", r: 3 }} />
                <Area type="monotone" dataKey="invested" name="Amount Invested" stroke="#16A34A" strokeWidth={2} fill="url(#invested)" dot={{ fill: "#16A34A", r: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <SectionHeader title="Portfolio Allocation" subtitle="By asset class" />
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={allocationData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3}>
                  {allocationData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {allocationData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  {d.name}
                  <span className="font-semibold text-slate-900 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Transactions + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 overflow-x-auto">
            <SectionHeader
              title="Recent Transactions"
              action={
                <button
                  onClick={() => navigate("/clients")}
                  className="text-xs text-brand-primary font-semibold flex items-center gap-1"
                >
                  View All <ArrowUpRight size={12} />
                </button>
              }
            />
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  {["Client", "Fund", "Type", "Amount", "Status", "Date"].map((h) => (
                    <th key={h} className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 6).map((t, i) => (
                  <tr
                    key={i}
                    onClick={() => navigate(`/clients/${t.clientId}`)}
                    className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={t.client} size="sm" />
                        <span className="font-medium text-slate-900 text-xs">{t.client}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-xs text-slate-500 max-w-[140px] truncate">{t.fund}</td>
                    <td className="py-3 pr-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.type === "SIP" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3 pr-3 font-semibold text-xs text-slate-900">{inr(t.amount)}</td>
                    <td className="py-3 pr-3"><StatusBadge status={t.status} /></td>
                    <td className="py-3 text-xs text-slate-400">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <SectionHeader title="Recent Activity" />
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="p-1.5 rounded-full h-fit shrink-0" style={{ backgroundColor: a.color + "15" }}>
                    <a.icon size={13} style={{ color: a.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-800 leading-snug">{a.text}</div>
                    <div className="text-[10px] mt-0.5 text-slate-400">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Top Performing Funds */}
          <Card>
            <SectionHeader
              title="Top Performing Funds"
              subtitle="1 Year Returns"
              action={
                <button onClick={() => navigate("/funds")} className="text-xs text-brand-primary font-semibold flex items-center gap-1">
                  View All <ArrowUpRight size={12} />
                </button>
              }
            />
            <div className="space-y-3">
              {topFunds.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: ["#0F4C81", "#2563EB", "#16A34A", "#D97706", "#8B5CF6"][i] }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">{f.name}</div>
                      <div className="text-[10px] text-slate-400">{f.amc}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">{f.r1}%</div>
                    <div className="text-[10px] text-slate-400">3Y: {f.r3}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Follow-Ups */}
          <Card>
            <SectionHeader
              title="Upcoming Follow-Ups"
              subtitle="Scheduled actions"
              action={
                <button onClick={() => navigate("/calendar")} className="text-xs text-brand-primary font-semibold flex items-center gap-1">
                  Calendar <ArrowUpRight size={12} />
                </button>
              }
            />
            <div className="space-y-3">
              {upcomingFollowUps.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={f.client} size="sm" color={["#0F4C81","#2563EB","#16A34A","#D97706","#8B5CF6"][i]} />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{f.client}</div>
                      <div className="text-[10px] text-slate-500">{f.reason}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">{f.date}</span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: f.priority === "High" ? "#FEF2F2" : f.priority === "Medium" ? "#FFFBEB" : "#F0FDF4",
                        color: f.priority === "High" ? "#DC2626" : f.priority === "Medium" ? "#D97706" : "#16A34A",
                      }}
                    >
                      {f.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming SIPs */}
          <Card>
            <SectionHeader
              title="Upcoming SIP Payments"
              subtitle="This month"
            />
            <div className="space-y-3">
              {upcomingSips.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{s.client}</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{s.fund}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{inr(s.amount)}</div>
                    <div className={`text-[10px] font-semibold mt-0.5 ${s.status === "Failed" ? "text-red-500" : s.status === "Due Today" ? "text-orange-500" : "text-slate-400"}`}>
                      {s.date} · {s.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
