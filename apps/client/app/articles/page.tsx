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
          title="Thoughts on marketing, leadership, and building impactful products."
          description="A curated collection of long-form essays exploring marketing, startup growth, leadership in tech, and the frameworks that guide building meaningful businesses."
        />

        <Suspense fallback={<PageSectionSkeleton variant="articles" />}>
          <ArticleDynamic />
        </Suspense>
      </div>
    </main>
  );
}



