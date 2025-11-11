import PageHeader from "@/components/common/PageHeader";
import PageSection from "@/components/common/PageSection";

const contacts = [
  {
    category: "Business Consulting",
    title: "Book a 1-on-1 Strategy Session",
    description:
      "Wanna pick my brain about scaling your business operations, engage with investors, and securing funding? You can snag a paid spot here.",
    link: { text: "Schedule a call", url: "#" },
  },
  {
    category: "Pitch Refinement",
    title: "Perfect Your Investor Pitch",
    description:
      "I'm currently helping smart founders fine-tune their pitch and get funding for their businesses.",
    link: {
      text: "Get pitch feedback",
      url: "https://73hzazh6vmn.typeform.com/to/ugox4P7v",
    },
  },
];

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
