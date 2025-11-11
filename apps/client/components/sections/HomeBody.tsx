import { workHistory } from "@/data/workExperience";
import { ChevronRightIcon, EnvelopeIcon, BriefcaseIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Article {
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}

const articles: Article[] = [
  {
    date: "September 5, 2022",
    title: "Crafting a design system for a multiplanetary future",
    excerpt:
      "Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
    slug: "crafting-design-system",
  },
  {
    date: "September 2, 2022",
    title: "Introducing Animaginary: High performance web animations",
    excerpt:
      "When you're building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.",
    slug: "introducing-animaginary",
  },
  {
    date: "July 14, 2022",
    title: "Rewriting the cosmOS kernel in Rust",
    excerpt:
      "When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language, but it's been a while since I've seen an article on the front page of Hacker News about rewriting some important tool in Go and I see articles on there about rewriting things in Rust every single week.",
    slug: "rewriting-cosmos-kernel",
  },
];


export default function HomeBody() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5">

          {/* Main Content - Articles */}
          <div className="lg:col-span-3 space-y-5 mr-24 mb-20">
            {articles.map((item, idx) => (

              <div key={idx} className="rounded-xl mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-6 md:3/4 md:mt-0">
                
                <h2 className="text-sm text-secondary border-l border-border pl-2">
                  {item.date}
                </h2>
                
                <h2 className="text-base font-semibold text-heading mt-3">
                  {item.title}
                </h2>
             
                <p className="mt-2 text-secondary text-sm leading-relaxed">
                  {item.excerpt }
                </p>

                <Link
                  href="#"
                  className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
                >
                  Read article
                  <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>

            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-10">
            {/* Newsletter Signup */}
            <section className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <EnvelopeIcon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-heading">
                  Stay up to date
                </h3>
              </div>

              <p className="text-sm text-secondary mb-6">
                Get notified when I publish something new, and unsubscribe at any
                time.
              </p>

              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-2.5 bg-background text-text border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-disabled transition-all"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
                >
                  Join
                </button>
              </form>
            </section>

            {/* Work History */}
            <section className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <BriefcaseIcon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-heading">Work</h3>
              </div>

              <div className="space-y-4">
                {workHistory.map((job, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 group hover:bg-hover -mx-2 px-2 py-2 rounded-lg transition-colors"
                  >
                    {/* Company Logo */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden">
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-heading text-sm">
                        {job.company}
                      </div>
                      <div className="text-xs text-secondary">{job.role}</div>
                    </div>

                    {/* Years */}
                    <div className="text-xs text-secondary whitespace-nowrap">
                      {job.startYear} — {job.endYear}
                    </div>
                  </div>
                ))}
              </div>

              {/* Download CV Button */}
              <Link
                href="/cv.pdf"
                download
                className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-border text-secondary hover:text-text hover:bg-hover rounded-lg font-medium transition-colors group"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Download CV</span>
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}