'use client';

import { useState, useEffect } from 'react';
import { usePaginatedClientList } from '@/hook/usePaginatedClientList';
import { useClientEvents } from '@seye-bamidele/ui';
import { EventTransformedData } from '@seye-bamidele/shared-types';
import { useEventCache } from '@/lib/stores/event-cache';
import { transformEvents } from '@/app/utils/common/transformEvent';
import PageSection from '@/components/sections/PageSection';

export default function EventClientView() {
  const { cacheEvents, events: cachedEvents } = useEventCache();
  
  const [displayItems, setDisplayItems] = useState<EventTransformedData[]>(
    () => cachedEvents
  );

  const { items, loading, hasMore, loadMore } = usePaginatedClientList<any, EventTransformedData>({
    useSource: useClientEvents,
    transform: transformEvents,
    itemsPerPage: 10,
    onItemsTransformed: (transformedEvents) => {
      cacheEvents(transformedEvents);
    },
  });

  // Update display when fresh items arrive
  useEffect(() => {
    if (items.length > 0) {
      setDisplayItems(items);
    }
  }, [items]);

  return (
    <PageSection
      items={displayItems}
      variant="speaking"
      hasMore={hasMore}
      isLoading={loading && displayItems.length === 0}
      onLoadMore={loadMore}
    />
  );
}
