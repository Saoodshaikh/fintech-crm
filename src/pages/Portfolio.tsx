import { useState } from "react";
import { IndianRupee, Briefcase, TrendingUp, ArrowUpRight, ArrowDownRight, Calculator } from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import Layout from "../components/Layout";
import { Card, KpiCard, SectionHeader } from "../components/UI";
import { allocationData, sectorData, amcData, growthData, holdings, inr } from "../data/dummyData";

export default function Portfolio() {
  const totalInv = holdings.reduce((s, h) => s + h.investment, 0);
  const totalVal = holdings.reduce((s, h) => s + h.value, 0);
  const gain = totalVal - totalInv;
  const xirr = 15.8;

  // SIP Calculator
  const [sipAmt, setSipAmt] = useState(10000);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturn, setSipReturn] = useState(14);

  const sipFV = sipAmt * (((Math.pow(1 + sipReturn / 1200, sipYears * 12) - 1) / (sipReturn / 1200)) * (1 + sipReturn / 1200));
  const sipInvested = sipAmt * sipYears * 12;

  // Lumpsum Calculator
  const [lsAmt, setLsAmt] = useState(100000);
  const [lsYears, setLsYears] = useState(10);
  const [lsReturn, setLsReturn] = useState(14);
  const lsFV = lsAmt * Math.pow(1 + lsReturn / 100, lsYears);

  const cards = [
    { label: "Total Investment", value: inr(totalInv), accent: "#0F4C81", icon: IndianRupee },
    { label: "Current Value", value: inr(totalVal), accent: "#2563EB", icon: Briefcase },
    { label: "Total Profit", value: inr(gain), accent: "#16A34A", icon: TrendingUp, trend: `+${((gain / totalInv) * 100).toFixed(1)}%`, trendUp: true },
    { label: "Overall Return", value: `${((gain / totalInv) * 100).toFixed(1)}%`, accent: "#16A34A", icon: ArrowUpRight },
    { label: "XIRR (Annualised)", value: `${xirr}%`, accent: "#D97706", icon: TrendingUp, trend: "Since inception", trendUp: true },
  ];

  return (
    <Layout title="Portfolio">
      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cards.map((c) => <KpiCard key={c.label} {...c} />)}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Asset Allocation */}
          <Card>
            <SectionHeader title="Asset Allocation" subtitle="By fund category" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={allocationData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={3}>
                  {allocationData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {allocationData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-500">{d.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Sector Allocation */}
          <Card>
            <SectionHeader title="Sector Allocation" subtitle="By industry" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={sectorData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={3}>
                  {sectorData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {sectorData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-slate-500 truncate">{d.name}</span>
                  <span className="font-semibold text-slate-900 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* AMC Allocation */}
          <Card>
            <SectionHeader title="AMC Allocation" subtitle="By fund house (₹ Cr)" />
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={amcData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="amc" type="category" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} width={70} />
                <Tooltip />
                <Bar dataKey="value" fill="#0F4C81" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Performance Trend */}
        <Card>
          <SectionHeader title="Portfolio Performance Trend" subtitle="7-month investment growth (₹ Lakhs)" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name="Portfolio Value" stroke="#16A34A" strokeWidth={2.5} dot={{ fill: "#16A34A", r: 3 }} />
              <Line type="monotone" dataKey="invested" name="Invested" stroke="#0F4C81" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#0F4C81", r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Holdings Table */}
        <Card className="overflow-x-auto">
          <SectionHeader title="Portfolio Holdings" subtitle={`${holdings.length} funds`} />
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 rounded-xl">
                {["Fund Name", "Category", "Units", "Invested", "Current Value", "Gain / Loss", "Return %"].map((h) => (
                  <th key={h} className="py-3 px-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const g = h.value - h.investment;
                const r = ((g / h.investment) * 100).toFixed(1);
                return (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-slate-900">{h.fund}</td>
                    <td className="py-3.5 px-3">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg font-medium">{h.category}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">{h.units}</td>
                    <td className="py-3.5 px-3 text-slate-600">{inr(h.investment)}</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-900">{inr(h.value)}</td>
                    <td className={`py-3.5 px-3 font-semibold flex items-center gap-1 ${g >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {g >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {inr(Math.abs(g))}
                    </td>
                    <td className={`py-3.5 px-3 font-bold ${g >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {g >= 0 ? "+" : ""}{r}%
                    </td>
                  </tr>
                );
              })}
              {/* Totals Row */}
              <tr className="bg-slate-50 font-bold">
                <td className="py-3 px-3 text-slate-900">Total</td>
                <td className="py-3 px-3" />
                <td className="py-3 px-3" />
                <td className="py-3 px-3 text-slate-900">{inr(totalInv)}</td>
                <td className="py-3 px-3 text-slate-900">{inr(totalVal)}</td>
                <td className="py-3 px-3 text-green-600">{inr(gain)}</td>
                <td className="py-3 px-3 text-green-600">+{((gain / totalInv) * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* Calculators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* SIP Calculator */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Calculator size={18} className="text-brand-primary" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">SIP Calculator</div>
                <div className="text-xs text-slate-500">Estimate your SIP returns</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Monthly SIP Amount</span>
                  <span className="font-bold text-brand-primary">₹{sipAmt.toLocaleString("en-IN")}</span>
                </div>
                <input type="range" min={500} max={100000} step={500} value={sipAmt} onChange={(e) => setSipAmt(Number(e.target.value))} className="w-full accent-brand-primary" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>₹500</span><span>₹1,00,000</span></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Expected Return (%)</span>
                  <span className="font-bold text-brand-primary">{sipReturn}% p.a.</span>
                </div>
                <input type="range" min={4} max={30} step={0.5} value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-full accent-brand-primary" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>4%</span><span>30%</span></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Time Period</span>
                  <span className="font-bold text-brand-primary">{sipYears} Years</span>
                </div>
                <input type="range" min={1} max={40} step={1} value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full accent-brand-primary" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>1Y</span><span>40Y</span></div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Invested</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">₹{(sipInvested / 100000).toFixed(1)}L</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Returns</div>
                  <div className="text-sm font-bold text-green-600 mt-1">₹{((sipFV - sipInvested) / 100000).toFixed(1)}L</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Future Value</div>
                  <div className="text-base font-bold text-brand-primary mt-1">₹{(sipFV / 100000).toFixed(1)}L</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Lumpsum Calculator */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-50 rounded-xl">
                <IndianRupee size={18} className="text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Lumpsum Calculator</div>
                <div className="text-xs text-slate-500">Estimate one-time investment returns</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Investment Amount</span>
                  <span className="font-bold text-green-600">₹{lsAmt.toLocaleString("en-IN")}</span>
                </div>
                <input type="range" min={5000} max={5000000} step={5000} value={lsAmt} onChange={(e) => setLsAmt(Number(e.target.value))} className="w-full accent-green-500" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>₹5,000</span><span>₹50,00,000</span></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Expected Return (%)</span>
                  <span className="font-bold text-green-600">{lsReturn}% p.a.</span>
                </div>
                <input type="range" min={4} max={30} step={0.5} value={lsReturn} onChange={(e) => setLsReturn(Number(e.target.value))} className="w-full accent-green-500" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>4%</span><span>30%</span></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Time Period</span>
                  <span className="font-bold text-green-600">{lsYears} Years</span>
                </div>
                <input type="range" min={1} max={40} step={1} value={lsYears} onChange={(e) => setLsYears(Number(e.target.value))} className="w-full accent-green-500" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>1Y</span><span>40Y</span></div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Invested</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">₹{(lsAmt / 100000).toFixed(1)}L</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Returns</div>
                  <div className="text-sm font-bold text-green-600 mt-1">₹{((lsFV - lsAmt) / 100000).toFixed(1)}L</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Future Value</div>
                  <div className="text-base font-bold text-green-700 mt-1">₹{(lsFV / 100000).toFixed(1)}L</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
