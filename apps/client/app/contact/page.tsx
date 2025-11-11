import PageHeader from "@/components/common/PageHeader";
import PageSection from "@/components/common/PageSection";
import { contacts } from "@/data/contact";



export default function Contact() {
  return (
    <main className="min-h-screen">
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
