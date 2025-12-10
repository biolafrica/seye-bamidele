import TeamClient from "@/components/pages/team/TeamClient";
import { createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Team",
  description: "Manage your team members",
});

export default function TeamPage() {
  return (<TeamClient/>);
}
