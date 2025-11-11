import { getEvents } from "@/app/utils/database/getTasks";
import PageSection from "./PageSection";
import { transformEvents } from "@/app/utils/common/transformEvent";

export default async function SpeakingDynamic() {
  const events = await getEvents();
  const speakingEvents = transformEvents(events);
  return(
    <>
      <PageSection items={speakingEvents} variant="speaking" />
    </>
  )
}