import {ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ContactOption {
  category: string;
  title?: string;
  excerpt: string;
  link: {
    text: string;
    url: string;
  };
}

const contacts: ContactOption[] = [
  {
    category: "Business Consulting",
    title: "Book a 1-on-1 Strategy Session",
    excerpt:
      "Wanna pick my brain about scaling your business operations, engage with investors, and securing funding? You can snag a paid spot here.",
    link: {
      text: "Schedule a call",
      url: "#",
    },
  },
  {
    category: "Pitch Refinement",
    title: "Perfect Your Investor Pitch",
    excerpt:
      "I'm currently helping smart founders fine-tune their pitch and get funding for their businesses.",
    link: {
      text: "Get pitch feedback",
      url: "https://73hzazh6vmn.typeform.com/to/ugox4P7v?typeform-source=www.seyebandele.com",
    },
  },
];

export default function Contact() {
  return (
    <main className="min-h-screen ">
      <div className="max-w-3xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-heading">
            Let's work together
          </h1>
          <p className="mt-4 text-secondary text-base">
            I'm passionate about helping founders build successful businesses. Whether you need
            strategic advice or hands-on support, I'm here to help you achieve your goals.
          </p>
        </header>

        {/* Articles */}
        <section className="space-y-12 md:space-y-0">
          {contacts.map((contact, idx) => (
            <article
              key={idx}
              className="md:flex gap-3  rounded-lg md:rounded-none md:p-0 "
            >
              <div className="md:border-l md:border-separator w-full py-0 md:pl-6 md:w-1/4 md:py-5 ">
                <div className="text-base font-semibold text-heading" >
                  {contact.category}
                </div>
              </div>

              <div className="rounded-lg mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-5 md:3/4 md:mt-0 ">

                <h2 className="text-base font-semibold text-heading mt-3">
                  {contact.title}
                </h2>

                <p className="mt-2 text-secondary text-sm leading-relaxed">
                  {contact.excerpt}
                </p>

                <Link
                  href={contact.link.url}
                  className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
                >
                  {contact.link.text}
                  <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </article>
          ))}
        </section>
      </div>
    </main>
  );
}