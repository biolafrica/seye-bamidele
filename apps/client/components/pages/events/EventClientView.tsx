'use client';

import { useEffect, useState } from "react";
import { transformEvents } from "@/app/utils/common/transformEvent";
import PageSection from "../../sections/PageSection";
import { useClientEvents} from "@seye-bamidele/ui";
import { EventTransformedData } from "@seye-bamidele/shared-types";

export default function EventClientView() {

  const { data: dbEvent, pagination, getAll, loading } = useClientEvents(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState<EventTransformedData[]>([]);
  const itemsPerPage = 10;


  useEffect(() => {
    getAll({ page: '1', limit: String(itemsPerPage) });
  }, []);


  useEffect(() => {
    if (dbEvent) {
      const transformed = transformEvents(dbEvent);
      
      if (currentPage === 1) {
        setAllEvents(transformed);
      } else {
        setAllEvents(prev => [...prev, ...transformed]);
      }
    }
  }, [dbEvent]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getAll({ page: String(nextPage), limit: String(itemsPerPage) });
  };

  const hasMore = pagination ? currentPage < pagination.totalPages : false;


  return (
    <div>
      <PageSection
        items={allEvents}
        variant="speaking"
        hasMore={hasMore}
        isLoading={loading}
        onLoadMore={handleLoadMore}
      />
    </div>
  );

}

