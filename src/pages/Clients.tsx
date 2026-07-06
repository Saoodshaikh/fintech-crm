import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, Plus, Eye, Pencil, Trash2, X, Users } from "lucide-react";
import Layout from "../components/Layout";
import { Card, StatusBadge, RiskBadge, Avatar, Button } from "../components/UI";
import { useCrm } from "../context/CrmContext";
import { inr } from "../data/dummyData";

const RISK_OPTIONS = ["All", "Conservative", "Moderate", "Aggressive"];
const STATUS_OPTIONS = ["All", "Active", "KYC Pending", "Inactive"];
const GOAL_OPTIONS = ["All", "Retirement", "Wealth Creation", "Tax Saving", "Children Education", "House Purchase", "Regular Income"];

function AddClientModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-bold text-slate-900">Add New Client</h2>
            <p className="text-xs text-slate-500">Fill in the client details to onboard</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Personal Info */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Personal Information</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", placeholder: "Rahul Sharma", type: "text" },
                { label: "Mobile", placeholder: "+91 98000 00000", type: "tel" },
                { label: "Email", placeholder: "rahul@example.com", type: "email" },
                { label: "Date of Birth", placeholder: "", type: "date" },
                { label: "PAN Number", placeholder: "ABCDE1234F", type: "text" },
                { label: "Aadhaar Number", placeholder: "1234 5678 9012", type: "text" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-slate-700 block mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="text-xs font-medium text-slate-700 block mb-1">Address</label>
                <textarea
                  rows={2}
                  placeholder="Full address..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Financial Profile</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Occupation</label>
                <input placeholder="Software Engineer" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Annual Income</label>
                <input type="number" placeholder="1800000" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Risk Profile</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-primary">
                  <option value="">Select Risk Profile</option>
                  <option>Conservative</option>
                  <option>Moderate</option>
                  <option>Aggressive</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Investment Goal</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-primary">
                  <option value="">Select Goal</option>
                  <option>Retirement</option>
                  <option>Wealth Creation</option>
                  <option>Tax Saving</option>
                  <option>Children Education</option>
                  <option>House Purchase</option>
                  <option>Regular Income</option>
                </select>
              </div>
            </div>
          </div>

          {/* Nominee */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Nominee Details</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Nominee Name</label>
                <input placeholder="Full Name" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Relation</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-brand-primary">
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Child</option>
                  <option>Sibling</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Share %</label>
                <input type="number" defaultValue={100} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Bank Details</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Account Number</label>
                <input placeholder="Account Number" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">IFSC Code</label>
                <input placeholder="HDFC0001234" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Branch Name</label>
                <input placeholder="Branch Name" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Notes / Remarks</label>
            <textarea
              rows={3}
              placeholder="Any special notes about this client..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>
              <Plus size={16} /> Save Client
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const { clients } = useCrm();
  const [q, setQ] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [goalFilter, setGoalFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      clients.filter((c) => {
        const matchQ =
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.pan.toLowerCase().includes(q.toLowerCase()) ||
          c.email.toLowerCase().includes(q.toLowerCase());
        const matchRisk = riskFilter === "All" || c.risk === riskFilter;
        const matchStatus = statusFilter === "All" || c.status === statusFilter;
        const matchGoal = goalFilter === "All" || c.goal === goalFilter;
        return matchQ && matchRisk && matchStatus && matchGoal;
      }),
    [q, riskFilter, statusFilter, goalFilter]
  );

  return (
    <Layout title="Clients">
      {showAdd && <AddClientModal onClose={() => setShowAdd(false)} />}
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search clients..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm border border-slate-200 w-56 outline-none focus:border-brand-primary/40 focus:ring-1 focus:ring-brand-primary/20"
              />
            </div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-700 bg-white outline-none"
            >
              {RISK_OPTIONS.map((r) => <option key={r}>{r === "All" ? "All Risk Profiles" : r}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-700 bg-white outline-none"
            >
              {STATUS_OPTIONS.map((s) => <option key={s}>{s === "All" ? "All Status" : s}</option>)}
            </select>
            <select
              value={goalFilter}
              onChange={(e) => setGoalFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-700 bg-white outline-none"
            >
              {GOAL_OPTIONS.map((g) => <option key={g}>{g === "All" ? "All Goals" : g}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter size={14} /> Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download size={14} /> Export
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
              <Plus size={14} /> Add Client
            </Button>
          </div>
        </div>

        {/* Summary Strip */}
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <span className="font-medium text-slate-900">{filtered.length} Clients</span>
          <span>{filtered.filter((c) => c.status === "Active").length} Active</span>
          <span>{filtered.filter((c) => c.status === "KYC Pending").length} KYC Pending</span>
          <span className="text-brand-primary font-semibold">
            Total AUM: {inr(filtered.reduce((s, c) => s + c.aum, 0))}
          </span>
        </div>

        {/* Table */}
        <Card className="overflow-x-auto" noPad>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Client", "PAN / Mobile", "Risk Profile", "Goal", "Portfolio Value", "Returns", "Last Follow-up", "Status", "Actions"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const returns = (((c.currentValue - c.aum) / c.aum) * 100).toFixed(1);
                const isPositive = c.currentValue >= c.aum;
                return (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate(`/clients/${c.id}`)}
                      >
                        <Avatar name={c.name} size="sm" color={["#0F4C81","#2563EB","#16A34A","#D97706","#8B5CF6","#0F4C81","#2563EB","#16A34A","#D97706","#8B5CF6","#0F4C81","#2563EB"][c.id - 1]} />
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{c.name}</div>
                          <div className="text-[10px] text-slate-400">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-mono text-slate-700">{c.pan}</div>
                      <div className="text-[10px] text-slate-400">{c.mobile}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <RiskBadge risk={c.risk} />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-lg font-medium">{c.goal}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs text-slate-900">{inr(c.currentValue)}</div>
                      <div className="text-[10px] text-slate-400">Invested: {inr(c.aum)}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className={`text-xs font-bold ${isPositive ? "text-green-600" : "text-red-500"}`}>
                        {isPositive ? "+" : ""}{returns}%
                      </div>
                      <div className="text-[10px] text-slate-400">XIRR: {c.xirr}%</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {c.lastFollowUp}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => navigate(`/clients/${c.id}`)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Users size={40} className="mx-auto mb-3 text-slate-300" />
              <div className="font-medium text-slate-600">No clients found</div>
              <div className="text-sm mt-1">Try adjusting your filters</div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
