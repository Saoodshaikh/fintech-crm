import { useState } from "react";
import { Search, Eye, GitCompare } from "lucide-react";
import Layout from "../components/Layout";
import { Card, Badge, Button } from "../components/UI";
import { funds } from "../data/dummyData";

const riskColor: Record<string, string> = { Moderate: "#2563EB", High: "#D97706", "Very High": "#DC2626" };

export default function MutualFunds() {
  const [q, setQ] = useState("");
  const filtered = funds.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <Layout title="Mutual Funds">
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search funds..." className="pl-9 pr-4 py-2 rounded-xl text-sm border border-slate-200 w-64 outline-none" />
          </div>
          <select className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-900">
            <option>All Categories</option><option>Large Cap</option><option>Small Cap</option><option>Flexi Cap</option>
          </select>
          <select className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-900">
            <option>All AMCs</option><option>HDFC MF</option><option>SBI MF</option><option>Axis MF</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((f) => (
            <Card key={f.name} className="flex flex-col gap-4">
              <div>
                <div className="font-semibold text-lg text-slate-900 tracking-tight">{f.name}</div>
                <div className="text-sm mt-0.5 text-slate-500">{f.category} · {f.amc}</div>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-slate-500 font-medium">NAV</span>
                <span className="font-semibold text-slate-900 text-base">₹{f.nav}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                {[["1Y", f.r1], ["3Y", f.r3], ["5Y", f.r5]].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-0.5">{l} Return</div>
                    <div className="text-sm font-bold text-brand-success">{v}%</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <Badge color={riskColor[f.risk] || "#64748B"}>{f.risk} Risk</Badge>
                <span className="text-slate-500 font-medium">Expense: {f.expense}%</span>
              </div>
              <div className="flex gap-2 pt-3">
                <Button variant="outline" className="flex-1 text-xs px-0 py-1.5"><Eye size={14} /> View</Button>
                <Button variant="outline" className="flex-1 text-xs px-0 py-1.5"><GitCompare size={14} /> Compare</Button>
                <Button variant="primary" className="flex-1 text-xs px-0 py-1.5">Invest</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
