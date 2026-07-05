import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Sidebar />
      <div className="ml-60">
        <Topbar title={title} />
        {children}
      </div>
    </div>
  );
}
