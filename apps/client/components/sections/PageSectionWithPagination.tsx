"use client";

import { useState } from "react";
import PageSection from "./PageSection";

interface PageSectionPaginatedProps {
  initialItems: any[];
  initialHasMore: boolean;
  fetchMore: (page: number) => Promise<{ data: any[]; hasMore: boolean }>;
  variant?: "articles" | "contact" | "speaking";
}

export default function PageSectionPaginated({
  initialItems,
  initialHasMore,
  fetchMore,
  variant = "articles",
}: PageSectionPaginatedProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    const nextPage = page + 1;

    const result = await fetchMore(nextPage);

    setItems(prev => [...prev, ...result.data]);
    setPage(nextPage);
    setHasMore(result.hasMore);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <PageSection items={items} variant={variant} />

      {hasMore && ( 
        <button
          onClick={loadMore}
          className="px-4 py-2 flex justify-self-center bg-accent text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
        
      )}
    </div>
  );
}
