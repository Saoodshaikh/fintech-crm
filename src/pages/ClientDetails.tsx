import { useParams, useNavigate } from "react-router-dom";
import { Phone, Mail, Shield, FileCheck, MessageSquare, ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";
import { Card } from "../components/UI";
import { clients, holdings, inr } from "../data/dummyData";

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = clients.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <Layout title="Client Not Found">
        <div className="p-6">Client not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title="Client Details">
      <div className="p-6 space-y-5">
        <button onClick={() => navigate("/clients")} className="flex items-center gap-1.5 text-sm text-slate-500">
          <ArrowLeft size={14} /> Back to Clients
        </button>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold bg-brand-primary">
              {client.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="font-semibold text-slate-900">{client.name}</div>
              <div className="text-xs text-slate-500">{client.pan} · {client.risk} Risk</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card><div className="text-xs mb-1 text-slate-500">Total AUM</div><div className="font-semibold text-slate-900">{inr(client.aum)}</div></Card>
          <Card><div className="text-xs mb-1 text-slate-500">Mobile</div><div className="font-semibold flex items-center gap-1 text-slate-900"><Phone size={12} />{client.mobile}</div></Card>
          <Card><div className="text-xs mb-1 text-slate-500">Email</div><div className="font-semibold flex items-center gap-1 text-xs text-slate-900"><Mail size={12} />{client.email}</div></Card>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2 text-slate-900">Mutual Fund Holdings</h4>
          <Card className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-500">
                <th className="pb-2">Fund</th><th className="pb-2">Units</th><th className="pb-2">Investment</th><th className="pb-2">Value</th>
              </tr></thead>
              <tbody>
                {holdings.slice(0, 3).map((h, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="py-2 text-slate-900">{h.fund}</td>
                    <td className="py-2 text-slate-500">{h.units}</td>
                    <td className="py-2 text-slate-500">{inr(h.investment)}</td>
                    <td className="py-2 font-medium text-brand-success">{inr(h.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-slate-900"><Shield size={14} /> Nominee Details</h4>
            <div className="text-sm text-slate-500">Anita {client.name.split(" ")[1]} — Spouse — 45%</div>
          </Card>
          <Card>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-slate-900"><FileCheck size={14} /> Documents</h4>
            <div className="text-sm text-slate-500">PAN Card, Aadhaar, Bank Proof — Verified</div>
          </Card>
        </div>

        <Card>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-slate-900"><MessageSquare size={14} /> Notes</h4>
          <div className="text-sm text-slate-500">Prefers equity-heavy allocation. Annual review scheduled every March.</div>
        </Card>
      </div>
    </Layout>
  );
}
