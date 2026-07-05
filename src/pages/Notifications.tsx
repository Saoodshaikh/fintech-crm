import { TrendingUp, Clock, AlertCircle, Cake } from "lucide-react";
import Layout from "../components/Layout";
import { Card, Badge } from "../components/UI";
import { notifications } from "../data/dummyData";

const iconMap: Record<string, { icon: any; color: string }> = {
  "Market Update": { icon: TrendingUp, color: "#2563EB" },
  "SIP Due": { icon: Clock, color: "#D97706" },
  "Pending KYC": { icon: AlertCircle, color: "#DC2626" },
  "Birthday Reminder": { icon: Cake, color: "#16A34A" },
  "Portfolio Alert": { icon: AlertCircle, color: "#0F4C81" },
};

export default function Notifications() {
  return (
    <Layout title="Notifications">
      <div className="p-6 space-y-3 max-w-3xl">
        {notifications.map((n, i) => {
          const meta = iconMap[n.type];
          const Icon = meta.icon;
          return (
            <Card key={i} className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: meta.color + "15" }}>
                <Icon size={16} style={{ color: meta.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge color={meta.color}>{n.type}</Badge>
                  <span className="text-xs text-slate-500">{n.time}</span>
                </div>
                <div className="text-sm mt-1.5 text-slate-900">{n.text}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
}
