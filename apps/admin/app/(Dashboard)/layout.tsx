import DashboardShell from "@/components/layout/DashboardShell";
import { DashboardLayoutProps } from "@/types/layout";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
