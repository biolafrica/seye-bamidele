import DashboardClient from '@/components/pages/dashboard/dashboardClient';
import { createMetadata } from '@seye-bamidele/ui';

export const metadata = createMetadata({
  title: "Dashboard",
  description: "View analytics, subscribers, articles, and more.",
});

export default function DashboardPage() {
  return (<DashboardClient />);
}
