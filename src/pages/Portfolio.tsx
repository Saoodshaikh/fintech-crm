import { IndianRupee, Briefcase, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";
import { Card, KpiCard } from "../components/UI";
import { allocationData, amcData, growthData, holdings, inr } from "../data/dummyData";

export default function Portfolio() {
  const totalInv = holdings.reduce((s, h) => s + h.investment, 0);
  const totalVal = holdings.reduce((s, h) => s + h.value, 0);
  const gain = totalVal - totalInv;

  const cards = [
    { label: "Total Investment", value: inr(totalInv), accent: "#0F4C81", icon: IndianRupee },
    { label: "Current Value", value: inr(totalVal), accent: "#2563EB", icon: Briefcase },
    { label: "Profit", value: inr(gain), accent: "#16A34A", icon: TrendingUp },
    { label: "Overall Return", value: ((gain / totalInv) * 100).toFixed(1) + "%", accent: "#16A34A", icon: ArrowUpRight },
  ];

  return (
    <Layout title="Portfolio">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c) => <KpiCard key={c.label} {...c} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card>
            <h3 className="font-semibold mb-4 text-sm text-slate-900">Asset Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={allocationData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {allocationData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 text-sm text-slate-900">AMC Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={amcData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="amc" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4 text-sm text-slate-900">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="overflow-x-auto">
          <h3 className="font-semibold mb-4 text-sm text-slate-900">Holdings</h3>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500">
              <th className="pb-2">Fund</th><th className="pb-2">Units</th><th className="pb-2">Investment</th><th className="pb-2">Current Value</th><th className="pb-2">Gain</th>
            </tr></thead>
            <tbody>
              {holdings.map((h, i) => {
                const g = h.value - h.investment;
                return (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="py-2.5 font-medium text-slate-900">{h.fund}</td>
                    <td className="py-2.5 text-slate-500">{h.units}</td>
                    <td className="py-2.5 text-slate-500">{inr(h.investment)}</td>
                    <td className="py-2.5 text-slate-900">{inr(h.value)}</td>
                    <td className={`py-2.5 font-medium flex items-center gap-1 ${g >= 0 ? "text-brand-success" : "text-brand-danger"}`}>
                      {g >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {inr(Math.abs(g))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  );
}
