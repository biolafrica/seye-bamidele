interface PageSectionSkeletonProps {
  variant: "articles" | "contact" | "speaking";
  count?: number;
}

export default function PageSectionSkeleton({ 
  variant, 
  count = 3 
}: PageSectionSkeletonProps) {
  return (
    <section className="space-y-12 md:space-y-0">
      {Array.from({ length: count }).map((_, idx) => (
        <article
          key={idx}
          className="md:flex gap-3 rounded-lg md:rounded-none md:p-0 animate-pulse"
        >
          {/* Left Column - Date/Category */}
          <div className="md:border-l md:border-separator w-full py-0 md:pl-6 md:w-1/4 md:py-5">
            {variant === "articles" && (
              <div className="skeleton-shimmer h-4 w-24 bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded"></div>
            )}

            {(variant === "contact" || variant === "speaking") && (
              <div className="skeleton-shimmer h-5 w-32 bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded"></div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="rounded-lg mt-3 w-full mb-9 md:p-5 md:3/4 md:mt-0">
            {variant === "speaking" && (
              <div className="h-4 w-48 skeleton-shimmer bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded border-l border-border pl-2"></div>
            )}

            {/* Title */}
            <div className={`h-5 w-3/4 skeleton-shimmer bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded ${
              variant === "speaking" ? "mt-3" : ""
            }`}></div>

            {/* Description/Excerpt Lines */}
            <div className="mt-2 space-y-2">
              <div className="h-4 w-full skeleton-shimmer bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded"></div>
              <div className="h-4 w-5/6 skeleton-shimmer bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded"></div>
              {idx % 2 === 0 && (
                <div className="h-4 w-4/5 skeleton-shimmer bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded"></div>
              )}
            </div>

            {/* Link */}
            <div className="mt-3 h-4 w-32 skeleton-shimmer bg-gradient-to-r from-hover via-active to-hover bg-[length:200%_100%] rounded"></div>
          </div>
        </article>
      ))}
    </section>
  );
}