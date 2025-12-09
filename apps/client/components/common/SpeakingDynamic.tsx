import {getPaginatedEvents } from "@/app/utils/database/getTasks";
import { transformEvents } from "@/app/utils/common/transformEvent";

import PageSectionPaginated from "../sections/PageSectionWithPagination";

export default async function SpeakingDynamic() {
  const page = 1;
  const limit = 10;

  const { data, hasMore } = await getPaginatedEvents(page, limit);
  const transformed = transformEvents(data);

  return (
    <PageSectionPaginated
      initialItems={transformed}
      initialHasMore={hasMore}
      variant="speaking"
      fetchMore={async (page) => {
        "use server";
        const result = await getPaginatedEvents(page, limit);
        return {
          data: transformEvents(result.data),
          hasMore: result.hasMore
        };
      }}
    />
  );
}
