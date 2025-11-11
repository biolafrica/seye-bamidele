import PageHeader from "@/components/common/PageHeader";
import { Suspense } from "react";
import PageSectionSkeleton from "@/components/common/pageSkeleton";
import SpeakingDynamic from "@/components/common/SpeakingDynamic";


export default async function Speaking() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="I've spoken at events all around the world and been interviewed for many podcasts."
          description="One of my favorite ways to share my ideas is live on stage, where there's so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
        />

        <Suspense fallback={<PageSectionSkeleton variant="speaking" />}>
          <SpeakingDynamic />
        </Suspense>
      </div>
    </main>
  );
}

