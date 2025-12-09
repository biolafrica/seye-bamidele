import { workHistory } from "@/data/workExperience";
import { EnvelopeIcon, BriefcaseIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import PageSectionSkeleton from "../common/pageSkeleton";
import HomeBlog from "./HomeBlog";
import Subscriber from "../common/subscriber";


export default function HomeBody() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5">

          <Suspense fallback={<PageSectionSkeleton variant="articles" />}>
            <HomeBlog/>
          </Suspense>

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

              <Subscriber />
              
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden">
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-heading text-sm">
                        {job.company}
                      </div>
                      <div className="text-xs text-secondary">{job.role}</div>
                    </div>

                    <div className="text-xs text-secondary whitespace-nowrap">
                      {job.startYear} — {job.endYear}
                    </div>

                  </div>
                ))}
              </div>

              <Link
                href="https://www.linkedin.com/in/seye-bandele-9550573b/"
                download
                className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-border text-secondary hover:text-text hover:bg-hover rounded-lg font-medium transition-colors group"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Explore CV</span>
              </Link>

            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}