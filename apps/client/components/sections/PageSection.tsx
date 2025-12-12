import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import PageSectionSkeleton from "../common/pageSkeleton";

interface PageSectionItem {
  category?: string;
  date?: string;
  event?: string;
  title?: string;
  excerpt?: string;
  description?: string;
  link: {
    text: string;
    url: string;
  };
}

interface PageSectionProps {
  items: PageSectionItem[];
  variant: "articles" | "contact" | "speaking";
  hasMore?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export default function PageSection({ 
  items, 
  variant, 
  hasMore = false,
  isLoading = false,
  onLoadMore 
}: PageSectionProps) {
  return (
    <div>
      <section className="space-y-12 md:space-y-0">
        {items.map((item, idx) => (
          <article
            key={idx}
            className="md:flex gap-3 rounded-lg md:rounded-none md:p-0"
          >
            <div className="md:border-l md:border-separator w-full py-0 md:pl-6 md:w-1/4 md:py-5">
              {variant === "articles" && (
                <time className="text-sm text-secondary">{item.date}</time>
              )}

              {(variant === "contact" || variant === "speaking") && item.category && (
                <div className="text-base font-semibold text-heading">
                  {item.category}
                </div>
              )}
            </div>

            <div className="rounded-lg mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-5 md:3/4 md:mt-0">
              {variant === "speaking" && item.event && (
                <h2 className="text-sm text-secondary border-l border-border pl-2">
                  {item.event}
                </h2>
              )}

              <h2 className="text-base font-semibold text-heading mt-3">
                {item.title}
              </h2>

              {(item.excerpt || item.description) && (
                <p className="mt-2 text-secondary text-sm leading-relaxed">
                  {item.excerpt ?? item.description}
                </p>
              )}

              <Link
                href={item.link.url}
                className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
              >
                {item.link.text}
                <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </section>
      {isLoading && (<PageSectionSkeleton variant="articles" />)}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}