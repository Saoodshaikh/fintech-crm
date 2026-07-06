import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <Topbar title={title} />
        <main className="min-h-[calc(100vh-5.5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
