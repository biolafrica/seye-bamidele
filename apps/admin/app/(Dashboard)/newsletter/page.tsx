import NewsletterClient from "@/components/pages/newsletters/newsletterClient";
import { createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Newsletters",
  description: "Manage your newsletter publications",
});


export default function NewsletterPage() {  
  return (<NewsletterClient/>);
}