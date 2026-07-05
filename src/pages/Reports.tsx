import { Briefcase, TrendingUp, FileText, Clock, IndianRupee } from "lucide-react";
import Layout from "../components/Layout";
import { Card, Button } from "../components/UI";

const reports = [
  { label: "Portfolio Report", icon: Briefcase },
  { label: "Capital Gain Report", icon: TrendingUp },
  { label: "Transaction Report", icon: FileText },
  { label: "SIP Report", icon: Clock },
  { label: "Commission Report", icon: IndianRupee },
];

export default function Reports() {
  return (
    <Layout title="Reports">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((r) => (
          <Card key={r.label} className="flex flex-col gap-4">
            <div className="p-2.5 rounded-xl w-fit bg-brand-primary/10">
              <r.icon size={20} className="text-brand-primary" />
            </div>
            <div className="font-semibold text-base text-slate-900">{r.label}</div>
            <div className="flex gap-2 flex-wrap mt-2">
              <Button variant="outline" className="px-3 py-1.5 text-xs">Download PDF</Button>
              <Button variant="outline" className="px-3 py-1.5 text-xs">Download Excel</Button>
              <Button variant="primary" className="px-3 py-1.5 text-xs">Share</Button>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
