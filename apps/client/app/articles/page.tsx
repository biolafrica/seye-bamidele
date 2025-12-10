import PageHeader from "@/components/common/PageHeader";
import { Suspense } from "react";
import PageSectionSkeleton from "@/components/common/pageSkeleton";
import ArticleDynamic from "@/components/common/ArticleDynamic";
import { createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Articles",
  description: "All of my long-form thoughts on Marketing, leadership, and more.",
});

export default function Articles() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="Writing on software design, company building, and the aerospace industry."
          description="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />

        <Suspense fallback={<PageSectionSkeleton variant="articles" />}>
          <ArticleDynamic />
        </Suspense>
      </div>
    </main>
  );
}



