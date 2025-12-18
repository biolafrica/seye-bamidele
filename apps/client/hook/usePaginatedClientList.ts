'use client';

import { PaginationData } from '@seye-bamidele/shared-types';
import { useEffect, useState } from 'react';

interface UsePaginatedClientListParams<TDb, TClient> {
  useSource: () => {
    data: TDb[];
    pagination: PaginationData | null;
    getAll: (params: Record<string, string>) => Promise<void>;
    loading: boolean;
  };
  transform: (data: TDb[]) => TClient[];
  itemsPerPage?: number;
  onItemsTransformed?: (items: TClient[]) => void;
  cachedItems?: TClient[]; // NEW: Pass cached items
}

export function usePaginatedClientList<TDb, TClient>({
  useSource,
  transform,
  itemsPerPage = 10,
  onItemsTransformed,
  cachedItems = [], // NEW
}: UsePaginatedClientListParams<TDb, TClient>) {
  const { data, pagination, getAll, loading } = useSource();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<TClient[]>(cachedItems); // Initialize with cache

  useEffect(() => {
    getAll({ page: '1', limit: String(itemsPerPage) });
  }, []);

  useEffect(() => {
    if (!data) return;

    const transformed = transform(data);

    // Notify parent component of transformed items
    onItemsTransformed?.(transformed);

    if (currentPage === 1) {
      setItems(transformed);
    } else {
      setItems(prev => [...prev, ...transformed]);
    }
  }, [data]);

  const loadMore = () => {
    if (!pagination) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    getAll({
      page: String(nextPage),
      limit: String(itemsPerPage),
    });
  };

  const hasMore = pagination ? currentPage < pagination.totalPages : false;

  return {
    items,
    loading,
    hasMore,
    loadMore,
  };
}

