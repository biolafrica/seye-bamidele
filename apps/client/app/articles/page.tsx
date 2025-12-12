import PageHeader from "@/components/common/PageHeader";
import { Suspense } from "react";
import PageSectionSkeleton from "@/components/common/pageSkeleton";
import { createMetadata } from "@seye-bamidele/ui";
import ArticlesViewClient from "@/components/pages/articles/ArticlesViewClient";

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
          <ArticlesViewClient />
        </Suspense>
      </div>
    </main>
  );
}



