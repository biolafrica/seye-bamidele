'use client';

import PageSection from '../../sections/PageSection';
import { useClientEvents } from '@seye-bamidele/ui';
import { transformEvents } from '@/app/utils/common/transformEvent';
import { EventTransformedData } from '@seye-bamidele/shared-types';
import { usePaginatedClientList } from '@/hook/usePaginatedClientList';
import { useEventCache } from '@/lib/stores/event-cache';

export default function EventClientView() {
  const { cacheEvents, events: cachedEvents } = useEventCache();

  const { items, loading, hasMore, loadMore } = usePaginatedClientList<any, EventTransformedData>({
    useSource: useClientEvents,
    transform: transformEvents,
    itemsPerPage: 10,
    onItemsTransformed: (transformedEvents) => {
      cacheEvents(transformedEvents);
    },
  });

  const displayItems = items.length > 0 ? items : cachedEvents;

  return (
    <PageSection
      items={displayItems}
      variant="speaking"
      hasMore={hasMore}
      isLoading={loading}
      onLoadMore={loadMore}
    />
  );
}

