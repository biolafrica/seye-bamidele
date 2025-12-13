'use client';

import PageSection from '../../sections/PageSection';
import { useClientEvents } from '@seye-bamidele/ui';
import { transformEvents } from '@/app/utils/common/transformEvent';
import { EventTransformedData } from '@seye-bamidele/shared-types';
import { usePaginatedClientList } from '@/hook/usePaginatedClientList';

export default function EventClientView() {
  const { items, loading, hasMore, loadMore } =
    usePaginatedClientList<any, EventTransformedData>({
      useSource: useClientEvents,
      transform: transformEvents,
      itemsPerPage: 10,
    });

  return (
    <PageSection
      items={items}
      variant="speaking"
      hasMore={hasMore}
      isLoading={loading}
      onLoadMore={loadMore}
    />
  );
}

