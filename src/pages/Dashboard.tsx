import { useNavigate } from "react-router-dom";
import {
  Users, Briefcase, TrendingUp, IndianRupee, AlertCircle, CheckCircle2,
  TrendingDown, Clock,
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";
import { Card, KpiCard, StatusBadge } from "../components/UI";
import { growthData, allocationData, transactions, inr } from "../data/dummyData";

const activity = [
  { text: "Rahul Sharma completed KYC verification", time: "2 hours ago", icon: CheckCircle2, color: "#16A34A" },
  { text: "New SIP started for Priya Mehta — ₹15,000/month", time: "5 hours ago", icon: TrendingUp, color: "#2563EB" },
  { text: "Amit Patel's KYC is pending review", time: "1 day ago", icon: AlertCircle, color: "#D97706" },
  { text: "Karan Shah redeemed ₹1,20,000 from Axis Small Cap", time: "1 day ago", icon: TrendingDown, color: "#DC2626" },
  { text: "Portfolio review scheduled with Neha Verma", time: "2 days ago", icon: Clock, color: "#0F4C81" },
];

const kpis = [
  { label: "Total Clients", value: "245", icon: Users, accent: "#0F4C81" },
  { label: "Total AUM", value: "₹18.40 Cr", icon: Briefcase, accent: "#2563EB" },
  { label: "Monthly SIP Collection", value: "₹12.80 L", icon: TrendingUp, accent: "#16A34A" },
  { label: "Today's Investment", value: "₹3.20 L", icon: IndianRupee, accent: "#D97706" },
  { label: "Pending KYC", value: "18", icon: AlertCircle, accent: "#DC2626" },
  { label: "Active Portfolios", value: "221", icon: CheckCircle2, accent: "#0F4C81" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Layout title="Dashboard">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Investment Growth</h3>
              <span className="text-xs text-slate-500">Last 7 months (₹ Lakh)</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F4C81" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0F4C81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0F4C81" strokeWidth={2} fill="url(#growth)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 text-slate-900">Portfolio Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={allocationData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {allocationData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {allocationData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} /> {d.name} ({d.value}%)
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 overflow-x-auto">
            <h3 className="font-semibold mb-4 text-slate-900">Recent Transactions</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">Fund</th>
                  <th className="pb-2 font-medium">Investment</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr 
                    key={i} 
                    onClick={() => navigate("/clients")}
                    className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-2 font-medium text-slate-900 rounded-l-xl">{t.client}</td>
                    <td className="py-3 text-slate-500">{t.fund}</td>
                    <td className="py-3 font-semibold text-slate-900">{inr(t.amount)}</td>
                    <td className="py-3"><StatusBadge status={t.status} /></td>
                    <td className="py-3 text-slate-500 rounded-r-xl">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 text-slate-900">Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="p-1.5 rounded-full h-fit" style={{ backgroundColor: a.color + "15" }}>
                    <a.icon size={14} style={{ color: a.color }} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-900">{a.text}</div>
                    <div className="text-xs mt-0.5 text-slate-500">{a.time}</div>
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
