import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Phone, Mail, Shield, MapPin, Briefcase, Target,
  TrendingUp, IndianRupee, FileText, Download, CalendarDays, Edit,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area,
  XAxis, YAxis, CartesianGrid,
} from "recharts";
import Layout from "../components/Layout";
import {
  Card, StatusBadge, RiskBadge, TabBar, Avatar, Timeline,
  DocumentCard, StatRow, SectionHeader, Button,
} from "../components/UI";
import { useCrm } from "../context/CrmContext";
import {
  holdings, inr,
  allocationData, growthData, clientDocuments, getClientTimeline,
} from "../data/dummyData";

const TABS = ["Overview", "Portfolio", "Mutual Funds", "SIP", "Transactions", "Documents", "Notes"];

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const { clients, sipRecords, transactions, openTransaction } = useCrm();

  const client = clients.find((c) => c.id === Number(id));
  const clientSips = sipRecords.filter((s) => s.clientId === Number(id));
  const clientTxns = transactions.filter((t) => t.clientId === Number(id));
  const timeline = getClientTimeline(Number(id));

  if (!client) {
    return (
      <Layout title="Client Not Found">
        <div className="p-6 text-center py-20">
          <div className="text-slate-400 text-lg">Client not found</div>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/clients")}>
            <ArrowLeft size={14} /> Back to Clients
          </Button>
        </div>
      </Layout>
    );
  }

  const gain = client.currentValue - client.aum;
  const gainPct = ((gain / client.aum) * 100).toFixed(1);

  const ACCENT_COLORS = ["#0F4C81", "#2563EB", "#16A34A", "#D97706", "#8B5CF6", "#0F4C81", "#2563EB", "#16A34A", "#D97706", "#8B5CF6", "#0F4C81", "#2563EB"];
  const accent = ACCENT_COLORS[(client.id - 1) % ACCENT_COLORS.length];

  return (
    <Layout title="Client Details">
      <div className="p-6 space-y-5">
        {/* Back */}
        <button
          onClick={() => navigate("/clients")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-primary transition-colors font-medium"
        >
          <ArrowLeft size={14} /> Back to Clients
        </button>

        {/* Profile Header */}
        <Card className="p-0" noPad>
          <div className="p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar name={client.name} size="xl" color={accent} />
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-bold text-slate-900">{client.name}</h2>
                    <StatusBadge status={client.status} />
                    <StatusBadge status={client.kycStatus} />
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Phone size={11} /> {client.mobile}</span>
                    <span className="flex items-center gap-1"><Mail size={11} /> {client.email}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {client.address.split(",")[1]?.trim()}</span>
                    <span className="flex items-center gap-1"><Shield size={11} /> {client.pan}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <RiskBadge risk={client.risk} />
                    <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                      <Target size={10} /> {client.goal}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Briefcase size={10} /> {client.occupation}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <FileText size={10} /> Advisor: {client.advisor}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Edit size={14} /> Edit Profile</Button>
                <Button variant="primary" size="sm" onClick={() => openTransaction(null, client)}>
                  <TrendingUp size={14} /> Invest
                </Button>
              </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5 pt-5 border-t border-slate-100">
              {[
                { label: "Total Invested", value: inr(client.aum), icon: IndianRupee, color: "#0F4C81" },
                { label: "Current Value", value: inr(client.currentValue), icon: TrendingUp, color: "#2563EB" },
                { label: "Overall Gain", value: inr(gain), icon: TrendingUp, color: gain >= 0 ? "#16A34A" : "#DC2626" },
                { label: "Returns", value: `${gainPct}%`, icon: TrendingUp, color: gain >= 0 ? "#16A34A" : "#DC2626" },
                { label: "XIRR", value: `${client.xirr}%`, icon: Target, color: "#D97706" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                  <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card className="lg:col-span-2">
              <SectionHeader title="Investment Summary" />
              <div className="grid grid-cols-2 gap-x-6">
                <StatRow label="PAN Number" value={client.pan} />
                <StatRow label="Aadhaar" value={client.aadhaar} />
                <StatRow label="Date of Birth" value={client.dob} />
                <StatRow label="Occupation" value={client.occupation} />
                <StatRow label="Annual Income" value={inr(client.annualIncome)} />
                <StatRow label="Risk Profile" value={client.risk} />
                <StatRow label="Investment Goal" value={client.goal} />
                <StatRow label="Advisor" value={client.advisor} />
                <StatRow label="Last Follow-up" value={client.lastFollowUp} />
                <StatRow label="Next Follow-up" value={client.nextFollowUp} />
                <StatRow label="Joined Date" value={client.joinedDate} />
                <StatRow label="KYC Status" value={client.kycStatus} />
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bank Details</div>
                <div className="grid grid-cols-2 gap-x-6">
                  <StatRow label="Account" value={client.bank.account} />
                  <StatRow label="IFSC" value={client.bank.ifsc} />
                  <StatRow label="Branch" value={client.bank.branch} />
                  <StatRow label="Nominee" value={`${client.nominee.name} (${client.nominee.relation})`} />
                </div>
              </div>
            </Card>

            <div className="space-y-5">
              {/* Asset Allocation */}
              <Card>
                <SectionHeader title="Asset Allocation" />
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie data={allocationData} dataKey="value" innerRadius={45} outerRadius={72} paddingAngle={3}>
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

              {/* Upcoming Follow-up */}
              <Card>
                <SectionHeader title="Upcoming Follow-up" />
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <CalendarDays size={20} className="text-brand-primary shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{client.nextFollowUp}</div>
                    <div className="text-xs text-slate-500">Scheduled Review</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline */}
            <Card className="lg:col-span-2">
              <SectionHeader title="Client Timeline" subtitle="History of interactions" />
              <Timeline events={timeline} />
            </Card>

            {/* Notes */}
            <Card>
              <SectionHeader title="Advisor Notes" />
              <p className="text-sm text-slate-600 leading-relaxed">{client.notes}</p>
            </Card>
          </div>
        )}

        {activeTab === "Portfolio" && (
          <div className="space-y-5">
            <Card>
              <SectionHeader title="Portfolio Performance" subtitle="12-month trend" />
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accent} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke={accent} strokeWidth={2.5} fill={`url(#cg)`} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card className="overflow-x-auto">
              <SectionHeader title="Holdings" />
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    {["Fund Name", "Category", "Units", "Invested", "Current Value", "Gain/Loss", "Return %"].map((h) => (
                      <th key={h} className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h, i) => {
                    const g = h.value - h.investment;
                    const r = ((g / h.investment) * 100).toFixed(1);
                    return (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-3 font-medium text-slate-900">{h.fund}</td>
                        <td className="py-3 text-xs text-slate-500">{h.category}</td>
                        <td className="py-3 text-slate-500">{h.units}</td>
                        <td className="py-3 text-slate-500">{inr(h.investment)}</td>
                        <td className="py-3 font-semibold text-slate-900">{inr(h.value)}</td>
                        <td className={`py-3 font-semibold ${g >= 0 ? "text-green-600" : "text-red-500"}`}>{g >= 0 ? "+" : ""}{inr(g)}</td>
                        <td className={`py-3 font-semibold ${g >= 0 ? "text-green-600" : "text-red-500"}`}>{g >= 0 ? "+" : ""}{r}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeTab === "Mutual Funds" && (
          <Card className="overflow-x-auto">
            <SectionHeader title="Mutual Fund Holdings" />
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  {["Fund", "Category", "Units", "Avg NAV", "Current Value", "Return"].map((h) => (
                    <th key={h} className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {holdings.slice(0, 3).map((h, i) => {
                  const g = h.value - h.investment;
                  return (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-900">{h.fund}</td>
                      <td className="py-3 text-xs text-slate-500">{h.category}</td>
                      <td className="py-3 text-slate-500">{h.units}</td>
                      <td className="py-3 text-slate-500">{inr(Math.round(h.investment / h.units))}</td>
                      <td className="py-3 font-semibold text-slate-900">{inr(h.value)}</td>
                      <td className={`py-3 font-bold text-sm ${g >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {((g / h.investment) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === "SIP" && (
          <Card className="overflow-x-auto">
            <SectionHeader title="Active SIPs" subtitle={`${clientSips.length} SIPs registered`} />
            {clientSips.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No SIPs registered for this client.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    {["Fund", "Monthly SIP", "Start Date", "Next Date", "Units", "Status"].map((h) => (
                      <th key={h} className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientSips.map((s) => (
                    <tr key={s.id} className="border-t border-slate-100">
                      <td className="py-3 font-medium text-slate-900">{s.fund}</td>
                      <td className="py-3 font-bold text-brand-primary">{inr(s.amount)}</td>
                      <td className="py-3 text-slate-500 text-xs">{s.startDate}</td>
                      <td className="py-3 text-slate-500 text-xs">{s.nextDate}</td>
                      <td className="py-3 text-slate-500">{s.units}</td>
                      <td className="py-3"><StatusBadge status={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        )}

        {activeTab === "Transactions" && (
          <Card className="overflow-x-auto">
            <SectionHeader title="Transaction History" />
            {clientTxns.length === 0 ? (
              <div className="py-12 text-center text-slate-400">No transactions found.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    {["Fund", "Type", "Amount", "NAV", "Status", "Date"].map((h) => (
                      <th key={h} className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientTxns.map((t) => (
                    <tr key={t.id} className="border-t border-slate-100">
                      <td className="py-3 font-medium text-slate-900">{t.fund}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.type === "SIP" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3 font-semibold text-slate-900">{inr(t.amount)}</td>
                      <td className="py-3 text-slate-500">₹{t.nav}</td>
                      <td className="py-3"><StatusBadge status={t.status} /></td>
                      <td className="py-3 text-xs text-slate-500">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        )}

        {activeTab === "Documents" && (
          <Card>
            <SectionHeader
              title="Document Vault"
              subtitle="All uploaded documents"
              action={
                <Button variant="outline" size="sm">
                  <Download size={14} /> Download All
                </Button>
              }
            />
            <div className="space-y-3">
              {clientDocuments.map((doc) => (
                <DocumentCard key={doc.id} {...doc} />
              ))}
            </div>
          </Card>
        )}

        {activeTab === "Notes" && (
          <Card>
            <SectionHeader title="Advisor Notes" />
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
              <p className="text-sm text-slate-700 leading-relaxed">{client.notes}</p>
            </div>
            <textarea
              rows={4}
              placeholder="Add a new note..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
            />
            <div className="flex justify-end mt-3">
              <Button variant="primary" size="sm">Save Note</Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
