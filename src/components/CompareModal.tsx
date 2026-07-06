import { X, Check } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useCrm } from "../context/CrmContext";
import { Button } from "./UI";

const COMPARE_HISTORY = [
  { year: "2020", FundA: 100, FundB: 100, FundC: 100 },
  { year: "2021", FundA: 128, FundB: 115, FundC: 122 },
  { year: "2022", FundA: 112, FundB: 108, FundC: 105 },
  { year: "2023", FundA: 145, FundB: 132, FundC: 138 },
  { year: "2024", FundA: 178, FundB: 160, FundC: 165 },
  { year: "2025", FundA: 218, FundB: 195, FundC: 202 },
  { year: "2026", FundA: 242, FundB: 215, FundC: 220 },
];

export default function CompareModal() {
  const { compareFunds, toggleCompareFund, clearCompare, isCompareOpen, closeCompare } = useCrm();

  if (!isCompareOpen || compareFunds.length === 0) return null;

  // Map history to actual names of selected funds
  const chartData = COMPARE_HISTORY.map((h) => {
    const row: any = { year: h.year };
    if (compareFunds[0]) row[compareFunds[0].name] = Math.round(h.FundA * (compareFunds[0].r3 / 15));
    if (compareFunds[1]) row[compareFunds[1].name] = Math.round(h.FundB * (compareFunds[1].r3 / 15));
    if (compareFunds[2]) row[compareFunds[2].name] = Math.round(h.FundC * (compareFunds[2].r3 / 15));
    return row;
  });

  const COLORS = ["#0F4C81", "#16A34A", "#8B5CF6"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-base font-bold text-slate-900">Compare Mutual Funds</h2>
            <p className="text-xs text-slate-500 mt-0.5">Side-by-side comparison of {compareFunds.length} selected funds</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={clearCompare}>Clear All</Button>
            <button onClick={closeCompare} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <X size={18} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          {/* Chart Comparison */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Estimated Performance Trend (₹100 Invested)</h3>
            <div className="h-64 bg-slate-50 rounded-xl p-3 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {compareFunds.map((f, i) => (
                    <Area
                      key={f.name}
                      type="monotone"
                      dataKey={f.name}
                      stroke={COLORS[i]}
                      fillOpacity={0.03}
                      fill={COLORS[i]}
                      strokeWidth={2.5}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Grid Table */}
          <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 font-semibold text-slate-500 w-1/4 border-b border-slate-100">Parameters</th>
                  {compareFunds.map((f, i) => (
                    <th key={f.name} className="p-4 border-b border-slate-100 border-l border-slate-100 w-1/4">
                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-slate-900 text-sm leading-snug">{f.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{f.category}</div>
                        <button
                          onClick={() => toggleCompareFund(f)}
                          className="text-[10px] text-red-500 font-semibold hover:underline mt-1 self-start"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                  {compareFunds.length < 3 && (
                    <th className="p-4 border-b border-slate-100 border-l border-slate-100 bg-slate-50/50 text-slate-400 text-center font-medium">
                      Add a fund from list to compare
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "1-Year Return", key: "r1", format: (v: any) => `${v}%`, highlight: true },
                  { label: "3-Year Return", key: "r3", format: (v: any) => `${v}%`, highlight: true },
                  { label: "5-Year Return", key: "r5", format: (v: any) => `${v}%`, highlight: true },
                  { label: "Current NAV", key: "nav", format: (v: any) => `₹${v}` },
                  { label: "Fund AUM", key: "aum", format: (v: any) => `₹${v} Cr` },
                  { label: "Expense Ratio", key: "expense", format: (v: any) => `${v}%` },
                  { label: "Min SIP Amount", key: "minSip", format: (v: any) => `₹${v}` },
                  { label: "Min Lumpsum", key: "minLumpsum", format: (v: any) => `₹${v}` },
                  { label: "Exit Load", key: "exitLoad", format: (v: any) => v },
                  { label: "Fund Manager", key: "manager", format: (v: any) => v },
                  { label: "Risk Level", key: "risk", format: (v: any) => v },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                    <td className="p-3.5 font-semibold text-slate-500 bg-slate-50/30">{row.label}</td>
                    {compareFunds.map((f) => (
                      <td
                        key={f.name}
                        className={`p-3.5 border-l border-slate-100 font-medium ${
                          row.highlight ? "text-green-600 font-bold text-sm" : "text-slate-800"
                        }`}
                      >
                        {row.format((f as any)[row.key])}
                      </td>
                    ))}
                    {compareFunds.length < 3 && (
                      <td className="p-3.5 border-l border-slate-100 bg-slate-50/20" />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
