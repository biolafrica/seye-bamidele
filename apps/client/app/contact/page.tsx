import PageHeader from "@/components/common/PageHeader";
import PageHeadText from "@/components/common/pageHeading";
import PageSection from "@/components/sections/PageSection";
import { contacts } from "@/data/contact";
import { createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Seye Bandele for business inquiries, collaborations.",
});

export default function Contact() {
  return (
    <main className="min-h-screen">
      <PageHeadText pageText="CONTACT"/>
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="Let's work together"
          description="I'm passionate about helping founders build successful businesses. Whether you need strategic advice or hands-on support, I'm here to help you achieve your goals."
        />
        <PageSection items={contacts} variant="contact" />
      </div>
    </main>
  );
}
