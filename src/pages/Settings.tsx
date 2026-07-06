import { useState } from "react";
import {
  User, Building2, Users, Shield, Lock, Bell, Palette, ChevronRight,
  Save, Eye, EyeOff, Check,
} from "lucide-react";
import Layout from "../components/Layout";
import { Card, Button, TabBar } from "../components/UI";

const TABS = ["Profile", "Company", "Employees", "Roles & Permissions", "Security", "Notifications", "Theme"];

const employees = [
  { name: "Rahul Mehta", role: "Financial Advisor", email: "rahul.mehta@finvest.com", status: "Active" },
  { name: "Priya Kapoor", role: "Operations Manager", email: "priya.kapoor@finvest.com", status: "Active" },
  { name: "Suresh Iyer", role: "Relationship Manager", email: "suresh.iyer@finvest.com", status: "Active" },
  { name: "Ananya Das", role: "Compliance Officer", email: "ananya.das@finvest.com", status: "On Leave" },
  { name: "Rohan Jha", role: "Junior Advisor", email: "rohan.jha@finvest.com", status: "Active" },
];

function ProfilePanel() {
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Personal Information</h3>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-bold shadow">
            RM
          </div>
          <div>
            <Button variant="outline" size="sm">Change Photo</Button>
            <div className="text-xs text-slate-400 mt-1.5">JPG, PNG or GIF. Max 2MB.</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Rahul Mehta" },
            { label: "Email", value: "rahul.mehta@finvest.com" },
            { label: "Mobile", value: "+91 98765 43210" },
            { label: "AMFI Registration No.", value: "ARN-12345" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-medium text-slate-600 block mb-1">{f.label}</label>
              <input
                defaultValue={f.value}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="primary" size="sm"><Save size={14} /> Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}

function CompanyPanel() {
  return (
    <Card>
      <h3 className="font-semibold text-slate-900 mb-4">Company Details</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Company Name", value: "FinVest Wealth Management Pvt Ltd" },
          { label: "SEBI Registration", value: "INA000012345" },
          { label: "AMFI ARN", value: "ARN-12345" },
          { label: "GST Number", value: "27AABCF1234A1Z5" },
          { label: "PAN", value: "AABCF1234A" },
          { label: "Founded Year", value: "2018" },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs font-medium text-slate-600 block mb-1">{f.label}</label>
            <input
              defaultValue={f.value}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
            />
          </div>
        ))}
        <div className="col-span-2">
          <label className="text-xs font-medium text-slate-600 block mb-1">Registered Address</label>
          <textarea
            defaultValue="Level 12, Maker Chambers, Nariman Point, Mumbai, Maharashtra 400021"
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-brand-primary"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="primary" size="sm"><Save size={14} /> Update Company</Button>
      </div>
    </Card>
  );
}

function EmployeesPanel() {
  return (
    <Card className="overflow-x-auto" noPad>
      <div className="flex items-center justify-between p-5 pb-4">
        <h3 className="font-semibold text-slate-900">Team Members</h3>
        <Button variant="primary" size="sm">+ Add Employee</Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-y border-slate-100">
            {["Name", "Role", "Email", "Status", "Actions"].map((h) => (
              <th key={h} className="py-3 px-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((e, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3.5 px-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
                    {e.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <span className="font-medium text-slate-900">{e.name}</span>
                </div>
              </td>
              <td className="py-3.5 px-5 text-slate-600 text-xs">{e.role}</td>
              <td className="py-3.5 px-5 text-slate-500 text-xs">{e.email}</td>
              <td className="py-3.5 px-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${e.status === "Active" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                  {e.status}
                </span>
              </td>
              <td className="py-3.5 px-5">
                <Button variant="outline" size="sm">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function RolesPanel() {
  const roles = [
    { name: "Admin", perms: ["All Modules", "User Management", "Reports", "Settings"], count: 1 },
    { name: "Financial Advisor", perms: ["Dashboard", "Clients", "Portfolio", "Mutual Funds", "Reports"], count: 3 },
    { name: "Operations", perms: ["Clients", "Transactions", "Reports"], count: 1 },
    { name: "Read Only", perms: ["Dashboard", "Portfolio"], count: 0 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((r) => (
        <Card key={r.name}>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-slate-900">{r.name}</div>
            <span className="text-xs text-slate-400">{r.count} user{r.count !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {r.perms.map((p) => (
              <span key={p} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">{p}</span>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3 w-full">Edit Permissions</Button>
        </Card>
      ))}
    </div>
  );
}

function SecurityPanel() {
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-4 max-w-lg">
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Change Password</h3>
        <div className="space-y-3">
          {["Current Password", "New Password", "Confirm New Password"].map((l) => (
            <div key={l}>
              <label className="text-xs font-medium text-slate-600 block mb-1">{l}</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-primary pr-10"
                />
                <button
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-3 text-slate-400"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <Button
            variant="primary"
            size="sm"
            className="w-full mt-2"
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          >
            {saved ? <><Check size={14} /> Password Updated!</> : <><Lock size={14} /> Update Password</>}
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-900 mb-3">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-700">Authenticator App</div>
            <div className="text-xs text-slate-400">Use Google Authenticator or Authy</div>
          </div>
          <div className="w-12 h-6 rounded-full bg-green-500 relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow" />
          </div>
        </div>
      </Card>
    </div>
  );
}

function NotifPanel() {
  const prefs = [
    { label: "SIP Payment Reminders", desc: "Email and SMS alerts 1 day before SIP", email: true, sms: true },
    { label: "KYC Alerts", desc: "Notify when client KYC is pending or expiring", email: true, sms: false },
    { label: "Portfolio Alerts", desc: "Alerts when portfolio drifts from target", email: true, sms: false },
    { label: "Birthday Reminders", desc: "Daily morning reminder for client birthdays", email: true, sms: true },
    { label: "Market Updates", desc: "Daily market summary at 4:30 PM", email: false, sms: false },
    { label: "Commission Reports", desc: "Monthly commission statement", email: true, sms: false },
  ];

  return (
    <Card>
      <h3 className="font-semibold text-slate-900 mb-4">Notification Preferences</h3>
      <div className="space-y-1">
        <div className="grid grid-cols-[1fr_80px_80px] text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
          <span>Notification Type</span>
          <span className="text-center">Email</span>
          <span className="text-center">SMS</span>
        </div>
        {prefs.map((p) => (
          <div key={p.label} className="grid grid-cols-[1fr_80px_80px] items-center py-3 border-b border-slate-100 last:border-0">
            <div>
              <div className="text-sm font-medium text-slate-800">{p.label}</div>
              <div className="text-xs text-slate-400">{p.desc}</div>
            </div>
            <div className="flex justify-center">
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${p.email ? "bg-green-500" : "bg-slate-200"}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-all ${p.email ? "right-0.5" : "left-0.5"}`} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${p.sms ? "bg-green-500" : "bg-slate-200"}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-all ${p.sms ? "right-0.5" : "left-0.5"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ThemePanel() {
  const [selected, setSelected] = useState("Light");
  return (
    <Card className="max-w-lg">
      <h3 className="font-semibold text-slate-900 mb-4">Appearance</h3>
      <div className="grid grid-cols-2 gap-4">
        {["Light", "Dark"].map((t) => (
          <div
            key={t}
            onClick={() => setSelected(t)}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${selected === t ? "border-brand-primary bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}
          >
            <div className={`h-20 rounded-xl mb-3 ${t === "Light" ? "bg-white border border-slate-200" : "bg-slate-900"} flex items-start p-2 gap-1`}>
              <div className={`w-2 h-2 rounded-full ${t === "Light" ? "bg-slate-800" : "bg-white"}`} />
              <div className={`flex-1 h-1.5 rounded ${t === "Light" ? "bg-slate-200" : "bg-slate-700"} mt-0.5`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">{t} Mode</span>
              {selected === t && <Check size={16} className="text-brand-primary" />}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="text-xs font-medium text-slate-600 block mb-2">Accent Color</label>
        <div className="flex gap-3">
          {["#0F4C81", "#7C3AED", "#16A34A", "#DC2626", "#D97706"].map((c) => (
            <button
              key={c}
              className="w-8 h-8 rounded-full shadow border-2 border-white ring-2 ring-offset-2"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

const PANEL_MAP: Record<string, React.FC> = {
  Profile: ProfilePanel,
  Company: CompanyPanel,
  Employees: EmployeesPanel,
  "Roles & Permissions": RolesPanel,
  Security: SecurityPanel,
  Notifications: NotifPanel,
  Theme: ThemePanel,
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const ActivePanel = PANEL_MAP[activeTab] || ProfilePanel;

  return (
    <Layout title="Settings">
      <div className="p-6 space-y-5">
        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />
        <ActivePanel />
      </div>
    </Layout>
  );
}
