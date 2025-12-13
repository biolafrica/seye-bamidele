"use client";


import { useState } from "react";
import Header from "./header";
import Sider from "./sider";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState("Dashboard");

  return (
    <div className="flex flex-col bg-layout min-h-screen">
      <Header
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        currentModule={currentModule}
      />

      <div className="flex pt-[88px]">
        <aside className="hidden lg:block">
          <Sider onModuleChange={setCurrentModule} />
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-40">
              <Sider onModuleChange={setCurrentModule} />
            </div>
          </div>
        )}

        <main className="flex-1 w-full lg:ml-[276px]">
          {children}
        </main>
      </div>
    </div>
  );
}
