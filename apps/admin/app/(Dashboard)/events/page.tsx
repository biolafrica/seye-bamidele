import { createMetadata } from "@seye-bamidele/ui";
import EventClient from "@/components/pages/event/eventClient";

export const metadata = createMetadata({
  title: "Events",
  description: "Manage and track your events",
});

export default function EventsPage() {
  
  return (<EventClient/>);
}
