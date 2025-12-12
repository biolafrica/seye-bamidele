'use client';

import { useEffect, useState } from "react";
import { transformEvents } from "@/app/utils/common/transformEvent";
import { SpeakingEvent } from "@/types/event";
import PageSection from "../sections/PageSection";
import { useEvents } from "@seye-bamidele/ui";

export default function SpeakingDynamic() {

  const { data: dbEvent, pagination, getAll, loading } = useEvents(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [allEvents, setAllEvents] = useState<SpeakingEvent[]>([]);
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

