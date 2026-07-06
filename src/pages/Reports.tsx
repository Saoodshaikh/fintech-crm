import { useState } from "react";
import {
  Briefcase, TrendingUp, FileText, Clock, IndianRupee, UserCheck,
  Download, Share2, Calendar, CheckCircle2, ArrowRight,
} from "lucide-react";
import Layout from "../components/Layout";
import { Card, Button } from "../components/UI";

const reports = [
  {
    label: "Portfolio Report",
    desc: "Complete portfolio overview with fund-wise breakdown, returns, and asset allocation.",
    icon: Briefcase,
    color: "#0F4C81",
    lastGen: "01 Jul 2026",
    clients: 245,
  },
  {
    label: "Capital Gain Report",
    desc: "Realised and unrealised gains/losses for the financial year, categorised by fund type.",
    icon: TrendingUp,
    color: "#16A34A",
    lastGen: "30 Jun 2026",
    clients: 178,
  },
  {
    label: "Transaction Report",
    desc: "All buy, sell, and SIP transactions with NAV, units, and amount details.",
    icon: FileText,
    color: "#2563EB",
    lastGen: "05 Jul 2026",
    clients: 245,
  },
  {
    label: "SIP Report",
    desc: "Active, paused, and cancelled SIPs with instalment history and projections.",
    icon: Clock,
    color: "#D97706",
    lastGen: "03 Jul 2026",
    clients: 156,
  },
  {
    label: "Commission Report",
    desc: "Monthly trail and upfront commission summary by AMC and client.",
    icon: IndianRupee,
    color: "#8B5CF6",
    lastGen: "01 Jul 2026",
    clients: null,
  },
  {
    label: "Client Statement",
    desc: "Consolidated account statement for individual client covering all investments.",
    icon: UserCheck,
    color: "#DC2626",
    lastGen: "04 Jul 2026",
    clients: 1,
  },
];

export default function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = (label: string) => {
    setGenerating(label);
    setTimeout(() => setGenerating(null), 1800);
  };

  return (
    <Layout title="Reports">
      <div className="p-6 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Reports Generated", value: "1,248", sub: "This FY" },
            { label: "Clients Covered", value: "245", sub: "All active" },
            { label: "Last Generated", value: "Today", sub: "5 Jul 2026" },
            { label: "Pending Reports", value: "3", sub: "Action needed" },
          ].map((s) => (
            <Card key={s.label} className="text-center">
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs font-medium text-slate-700 mt-1">{s.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((r) => (
            <Card key={r.label} className="flex flex-col gap-0 p-0" noPad>
              {/* Card Header */}
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="p-3 rounded-2xl"
                    style={{ backgroundColor: r.color + "15" }}
                  >
                    <r.icon size={22} style={{ color: r.color }} />
                  </div>
                  {generating === r.label ? (
                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1.5 rounded-lg">
                      <CheckCircle2 size={13} /> Generated
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Calendar size={11} /> {r.lastGen}
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 mt-3 text-base">{r.label}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{r.desc}</p>

                {r.clients && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                    <UserCheck size={12} />
                    <span>{r.clients.toLocaleString()} clients covered</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mx-5" />

              {/* Actions */}
              <div className="p-4 flex gap-2 flex-wrap">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleGenerate(r.label)}
                >
                  <Download size={13} /> PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download size={13} /> Excel
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 size={13} /> Share
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Report Activity</h3>
            <button className="text-xs text-brand-primary font-semibold flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { report: "Transaction Report", user: "Rahul Mehta", action: "Downloaded PDF", time: "Today, 2:30 PM" },
              { report: "Portfolio Report — Karan Shah", user: "Rahul Mehta", action: "Shared via Email", time: "Today, 11:15 AM" },
              { report: "Capital Gain Report", user: "Rahul Mehta", action: "Downloaded Excel", time: "Yesterday, 4:00 PM" },
              { report: "SIP Report", user: "Rahul Mehta", action: "Generated PDF", time: "03 Jul 2026" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                    <FileText size={14} className="text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{item.report}</div>
                    <div className="text-xs text-slate-400">{item.action} · {item.user}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap">{item.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
