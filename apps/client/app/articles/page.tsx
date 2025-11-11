import PageHeader from "@/components/common/PageHeader";
import PageSection from "@/components/common/PageSection";

const articles = [
  {
    date: "September 5, 2022",
    title: "Crafting a design system for a multiplanetary future",
    excerpt:
      "Most companies try to stay ahead of the curve when it comes to visual design...",
    link: { text: "Read article", url: "#" },
  },
  {
    date: "September 2, 2022",
    title: "Introducing Animaginary: High performance web animations",
    excerpt:
      "When you're building a website for a company as ambitious as Planetaria...",
    link: { text: "Read article", url: "#" },
  },
];

export default function Articles() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="Writing on software design, company building, and the aerospace industry."
          description="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
        <PageSection items={articles} variant="articles" />
      </div>
    </main>
  );
}



