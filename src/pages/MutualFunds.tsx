import { useState } from "react";
import { Search, Eye, GitCompare, TrendingUp, X, IndianRupee, Calculator, CheckCircle2 } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import Layout from "../components/Layout";
import { Card, Badge, Button, RiskBadge, Riskometer, SectionHeader } from "../components/UI";
import { useCrm } from "../context/CrmContext";
import { funds } from "../data/dummyData";

const CATEGORIES = ["All Categories", "Flexi Cap", "Large Cap", "Small Cap", "Mid Cap", "Large & Mid Cap", "Multi Cap", "Index", "ELSS", "Value"];
const AMCS = ["All AMCs", "HDFC MF", "SBI MF", "Axis MF", "ICICI Pru MF", "Mirae Asset MF", "PPFAS MF", "Kotak MF", "Nippon India MF", "UTI MF", "Franklin Templeton", "DSP MF", "Quant MF"];
const RISKS = ["All Risk", "Moderate", "High", "Very High"];

const FUND_HISTORY = [
  { year: "2020", value: 100 },
  { year: "2021", value: 128 },
  { year: "2022", value: 112 },
  { year: "2023", value: 145 },
  { year: "2024", value: 178 },
  { year: "2025", value: 218 },
  { year: "2026", value: 242 },
];

function FundDetailModal({ fund, onClose }: { fund: typeof funds[0]; onClose: () => void }) {
  const { openTransaction } = useCrm();
  const [sipAmt, setSipAmt] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate] = useState(fund.r3);

  const sipFV = sipAmt * (((Math.pow(1 + sipRate / 1200, sipYears * 12) - 1) / (sipRate / 1200)) * (1 + sipRate / 1200));
  const totalInvested = sipAmt * sipYears * 12;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-bold text-slate-900">{fund.name}</h2>
            <div className="text-xs text-slate-500 mt-0.5">{fund.category} · {fund.amc} · Fund Manager: {fund.manager}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Performance Chart */}
            <div>
              <SectionHeader title="Performance History" subtitle="Growth of ₹100 invested" />
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={FUND_HISTORY}>
                  <defs>
                    <linearGradient id="fperf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F4C81" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#0F4C81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [`₹${v}`, "Portfolio Value"]} />
                  <Area type="monotone" dataKey="value" stroke="#0F4C81" strokeWidth={2.5} fill="url(#fperf)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Historical Returns */}
            <div className="grid grid-cols-4 gap-3">
              {[["1Y", fund.r1], ["3Y", fund.r3], ["5Y", fund.r5], ["Since Inception", (fund.r5 * 1.1).toFixed(1)]].map(([period, val]) => (
                <div key={period as string} className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">{period}</div>
                  <div className="text-xl font-bold text-green-600 mt-1">{val}%</div>
                  <div className="text-[10px] text-slate-400">p.a.</div>
                </div>
              ))}
            </div>

            {/* Risk Analysis */}
            <div>
              <SectionHeader title="Risk Analysis" />
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">Riskometer</span>
                    <span className="font-semibold text-slate-900">{fund.risk} Risk</span>
                  </div>
                  <Riskometer risk={fund.risk} />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { label: "Std Deviation", value: "14.2%" },
                    { label: "Sharpe Ratio", value: "1.68" },
                    { label: "Beta", value: "0.92" },
                  ].map((r) => (
                    <div key={r.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-xs text-slate-500">{r.label}</div>
                      <div className="text-base font-bold text-slate-900 mt-0.5">{r.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Fund Details */}
            <div className="space-y-2">
              <SectionHeader title="Fund Details" />
              {[
                { label: "NAV", value: `₹${fund.nav}` },
                { label: "AUM", value: `₹${fund.aum} Cr` },
                { label: "Expense Ratio", value: `${fund.expense}%` },
                { label: "Min SIP", value: `₹${fund.minSip}` },
                { label: "Min Lumpsum", value: `₹${fund.minLumpsum}` },
                { label: "Exit Load", value: fund.exitLoad },
                { label: "Fund Manager", value: fund.manager },
              ].map((d) => (
                <div key={d.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-xs">
                  <span className="text-slate-500">{d.label}</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[55%]">{d.value}</span>
                </div>
              ))}
            </div>

            {/* SIP Calculator */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Calculator size={16} className="text-brand-primary" />
                <span className="text-sm font-semibold text-slate-900">SIP Calculator</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Monthly SIP</label>
                  <input
                    type="range" min={500} max={50000} step={500} value={sipAmt}
                    onChange={(e) => setSipAmt(Number(e.target.value))}
                    className="w-full mt-1 accent-brand-primary"
                  />
                  <div className="text-sm font-bold text-brand-primary">₹{sipAmt.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Duration (Years)</label>
                  <input
                    type="range" min={1} max={30} step={1} value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full mt-1 accent-brand-primary"
                  />
                  <div className="text-sm font-bold text-brand-primary">{sipYears} Years</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-blue-200">
                  <div className="text-[10px] text-slate-500">Estimated Future Value</div>
                  <div className="text-xl font-bold text-green-600">₹{Math.round(sipFV).toLocaleString("en-IN")}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Invested: ₹{totalInvested.toLocaleString("en-IN")} · Gain: ₹{Math.round(sipFV - totalInvested).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" className="flex-1" onClick={() => { onClose(); openTransaction(fund); }}>Invest Now</Button>
              <Button variant="outline" className="flex-1" onClick={() => { onClose(); openTransaction(fund); }}>Add to SIP</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MutualFunds() {
  const { compareFunds, toggleCompareFund, openCompare, openTransaction } = useCrm();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [amc, setAmc] = useState("All AMCs");
  const [risk, setRisk] = useState("All Risk");
  const [selectedFund, setSelectedFund] = useState<typeof funds[0] | null>(null);

  const filtered = funds.filter((f) => {
    const matchQ = f.name.toLowerCase().includes(q.toLowerCase()) || f.amc.toLowerCase().includes(q.toLowerCase());
    const matchCat = category === "All Categories" || f.category === category;
    const matchAmc = amc === "All AMCs" || f.amc === amc;
    const matchRisk = risk === "All Risk" || f.risk === risk;
    return matchQ && matchCat && matchAmc && matchRisk;
  });

  return (
    <Layout title="Mutual Funds">
      {selectedFund && <FundDetailModal fund={selectedFund} onClose={() => setSelectedFund(null)} />}
      <div className="p-6 space-y-5">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search funds, AMC..."
              className="pl-9 pr-4 py-2 rounded-xl text-sm border border-slate-200 w-60 outline-none focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/20"
            />
          </div>
          {[
            { value: category, onChange: setCategory, options: CATEGORIES },
            { value: amc, onChange: setAmc, options: AMCS },
            { value: risk, onChange: setRisk, options: RISKS },
          ].map((f, i) => (
            <select
              key={i}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-700 bg-white outline-none focus:border-brand-primary/40"
            >
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ))}
          <span className="text-xs text-slate-500 ml-auto">{filtered.length} funds found</span>
        </div>

        {/* Fund Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((f) => (
            <Card key={f.name} className="flex flex-col gap-4">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-slate-900 leading-snug">{f.name}</div>
                  <div className="flex shrink-0 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-xs ${i < f.rating ? "text-amber-400" : "text-slate-200"}`}>★</span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">{f.category} · {f.amc}</div>
              </div>

              {/* NAV + AUM */}
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">NAV</div>
                  <div className="font-bold text-slate-900">₹{f.nav}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">AUM</div>
                  <div className="font-semibold text-slate-700">₹{f.aum} Cr</div>
                </div>
              </div>

              {/* Returns */}
              <div className="grid grid-cols-3 gap-2 text-center py-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-100">
                {[["1Y", f.r1], ["3Y", f.r3], ["5Y", f.r5]].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="text-[9px] uppercase font-bold tracking-wider text-slate-400">{l}</div>
                    <div className="text-base font-bold text-green-600 mt-0.5">{v}%</div>
                  </div>
                ))}
              </div>

              {/* Risk + Expense */}
              <div>
                <Riskometer risk={f.risk} />
                <div className="flex items-center justify-between mt-2">
                  <RiskBadge risk={f.risk} />
                  <span className="text-xs text-slate-500">Exp: <span className="font-semibold">{f.expense}%</span></span>
                  <span className="text-xs text-slate-500">Min SIP: <span className="font-semibold">₹{f.minSip}</span></span>
                </div>
              </div>

              {/* Fund Manager */}
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                  {f.manager.split(" ").map(w => w[0]).join("")}
                </div>
                <span>{f.manager}</span>
                <span className="text-slate-400 ml-auto">Fund Manager</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedFund(f)}>
                  <Eye size={13} /> Details
                </Button>
                <Button
                  variant={compareFunds.some((cf) => cf.name === f.name) ? "success" : "outline"}
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => toggleCompareFund(f)}
                >
                  <GitCompare size={13} /> {compareFunds.some((cf) => cf.name === f.name) ? "Comparing" : "Compare"}
                </Button>
                <Button variant="primary" size="sm" className="flex-1" onClick={() => openTransaction(f)}>Invest</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Compare Bar */}
      {compareFunds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0F4C81] text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-6 border border-white/10 animate-slide-up">
          <div className="text-xs font-semibold">
            {compareFunds.length} of 3 funds selected for comparison
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={openCompare}
              className="bg-white text-[#0F4C81] hover:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              Compare Now
            </button>
            <button
              onClick={() => {
                // Clear comparison state
                compareFunds.forEach((f) => toggleCompareFund(f));
              }}
              className="text-white/80 hover:text-white text-xs font-semibold px-2 py-2"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
