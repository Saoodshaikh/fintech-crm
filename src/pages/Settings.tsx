import { Users, Building2, Shield, Lock, Bell, Settings as SettingsIcon } from "lucide-react";
import Layout from "../components/Layout";
import { Card } from "../components/UI";

const sections = [
  { label: "Profile", icon: Users, desc: "Name, contact details, and photo" },
  { label: "Company", icon: Building2, desc: "Firm details and registration" },
  { label: "Branch", icon: Building2, desc: "Branch locations and codes" },
  { label: "Employees", icon: Users, desc: "Team members and access" },
  { label: "Roles & Permissions", icon: Shield, desc: "Access control by role" },
  { label: "Security", icon: Lock, desc: "Password and two-factor auth" },
  { label: "Notification Preferences", icon: Bell, desc: "Email and SMS alerts" },
  { label: "Theme", icon: SettingsIcon, desc: "Light and dark appearance" },
];

export default function Settings() {
  return (
    <Layout title="Settings">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Card key={s.label} className="flex items-center gap-4 cursor-pointer hover:border-brand-secondary/30">
            <div className="p-2.5 rounded-lg bg-brand-secondary/10">
              <s.icon size={18} className="text-brand-secondary" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">{s.label}</div>
              <div className="text-xs text-slate-500">{s.desc}</div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
