import PageHeader from "@/components/common/PageHeader";
import PageSection from "@/components/common/PageSection";
import { getEvents } from "../utils/database/getTasks";
import { transformEvents } from "../utils/common/transformEvent";


export default async function Speaking() {
  const events = await getEvents();
  const speakingEvents = transformEvents(events);


  return (
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="I've spoken at events all around the world and been interviewed for many podcasts."
          description="One of my favorite ways to share my ideas is live on stage, where there's so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
        />
        <PageSection items={speakingEvents} variant="speaking" />
      </div>
    </main>
  );
}

