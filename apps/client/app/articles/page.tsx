import {ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Article {
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

const articles: Article[] = [
  {
    date: "September 5, 2022",
    title: "Crafting a design system for a multiplanetary future",
    excerpt:
      "Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
    link: "#",
  },
  {
    date: "September 5, 2022",
    title: "Crafting a design system for a multiplanetary future",
    excerpt:
      "Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
    link: "#",
  },
  {
    date: "September 2, 2022",
    title: "Introducing Animaginary: High performance web animations",
    excerpt:
      "When you're building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.",
    link: "#",
  },
];

export default function Articles() {
  return (
    <main className="min-h-screen ">
      <div className="max-w-3xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-heading">
            Writing on software design, company building, and the aerospace
            industry.
          </h1>
          <p className="mt-4 text-secondary text-base">
            All of my long-form thoughts on programming, leadership, product
            design, and more, collected in chronological order.
          </p>
        </header>

        {/* Articles */}
        <section className="space-y-12 md:space-y-0">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="md:flex gap-3  rounded-lg md:rounded-none md:p-0 "
            >
              <div className="border-l border-separator pl-2 w-full py-0 md:pl-6 md:w-1/4 md:py-5 ">
                <time className="text-sm text-disabled" dateTime={article.date}>
                  {article.date}
                </time>
              </div>

              <div className="rounded-lg mt-3 w-full mb-7 md:hover:bg-hover md:cursor-pointer md:p-5 md:3/4 md:mt-0 ">
                <h2 className="text-base font-semibold text-heading">
                  {article.title}
                </h2>

                <p className="mt-2 text-secondary text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                <Link
                  href={article.link}
                  className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
                >
                  Read article
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


