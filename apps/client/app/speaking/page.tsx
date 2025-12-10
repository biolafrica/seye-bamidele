import PageHeader from "@/components/common/PageHeader";
import { Suspense } from "react";
import PageSectionSkeleton from "@/components/common/pageSkeleton";
import SpeakingDynamic from "@/components/common/SpeakingDynamic";
import { createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Speaking",
  description: "I've spoken at events all around the world and been interviewed for many podcasts.",
});

export default async function Speaking() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="Insights from stages and conversations."
          description="I’ve had the opportunity to speak at events and on podcasts across diverse audiences. Live discussions and interviews let me go beyond prepared remarks, they open a real dialogue about building teams, designing products, and shaping the future of work in Africa and beyond"
        />

        <Suspense fallback={<PageSectionSkeleton variant="speaking" />}>
          <SpeakingDynamic />
        </Suspense>
      </div>
    </main>
  );
}

