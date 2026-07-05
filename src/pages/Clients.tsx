import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, Plus } from "lucide-react";
import Layout from "../components/Layout";
import { Card, StatusBadge } from "../components/UI";
import { clients, inr } from "../data/dummyData";

export default function Clients() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const filtered = useMemo(
    () => clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <Layout title="Clients">
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search clients..."
              className="pl-9 pr-4 py-2 rounded-xl text-sm border border-slate-200 w-64 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-900">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-900">
              <Download size={14} /> Export
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white bg-brand-primary">
              <Plus size={14} /> Add Client
            </button>
          </div>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                {["Client Name", "PAN", "Mobile", "Email", "Risk Profile", "AUM", "Status", "Actions"].map((h) => (
                  <th key={h} className="pb-3 font-medium whitespace-nowrap pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr 
                  key={c.id} 
                  onClick={() => navigate(`/clients/${c.id}`)}
                  className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 pl-3 pr-4 font-medium whitespace-nowrap text-slate-900 rounded-l-xl">{c.name}</td>
                  <td className="py-4 pr-4 text-slate-500">{c.pan}</td>
                  <td className="py-4 pr-4 whitespace-nowrap text-slate-500">{c.mobile}</td>
                  <td className="py-4 pr-4 text-slate-500">{c.email}</td>
                  <td className="py-4 pr-4">{c.risk}</td>
                  <td className="py-4 pr-4 whitespace-nowrap font-semibold text-slate-900">{inr(c.aum)}</td>
                  <td className="py-4 pr-4"><StatusBadge status={c.status} /></td>
                  <td className="py-4 pr-3 rounded-r-xl">
                    <span className="text-xs font-semibold text-brand-secondary">
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  );
}
