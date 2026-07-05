import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import { Button } from "../components/UI";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex bg-brand-bg">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-brand-primary">F</div>
            <div>
              <div className="font-semibold text-slate-900">FinVest CRM</div>
              <div className="text-xs text-slate-500">Smart Investment Management Platform</div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-1 text-slate-900">Welcome back</h2>
          <p className="text-sm mb-6 text-slate-500">Sign in to manage your clients and portfolios.</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <div>
              <label className="text-sm font-medium text-slate-900">Email</label>
              <input defaultValue="rahul.mehta@finvest.com" className="mt-1 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-900">Password</label>
              <input type="password" defaultValue="password123" className="mt-1 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-brand-primary" /> Remember me
              </label>
              <a className="font-medium text-brand-secondary cursor-pointer">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-1 hidden lg:flex items-center justify-center bg-brand-primary">
        <div className="text-center px-10">
          <IndianRupee size={64} className="mx-auto mb-6 text-white opacity-90" />
          <h3 className="text-white text-2xl font-semibold mb-2">Grow client wealth, effortlessly</h3>
          <p className="text-sm text-blue-100/80">
            Track portfolios, manage SIPs, and deliver reports — all from one dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
