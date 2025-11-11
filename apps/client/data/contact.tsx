interface ContactOption {
  category: string;
  title: string;
  description: string;
  link: {
    text: string;
    url: string;
  };
}

export const contacts: ContactOption[] = [
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