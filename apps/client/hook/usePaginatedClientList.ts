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
}

export function usePaginatedClientList<TDb, TClient>({
  useSource,
  transform,
  itemsPerPage = 10,
}: UsePaginatedClientListParams<TDb, TClient>) {
  const { data, pagination, getAll, loading } = useSource();

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<TClient[]>([]);


  useEffect(() => {
    getAll({ page: '1', limit: String(itemsPerPage) });
  }, []);

  useEffect(() => {
    if (!data) return;

    const transformed = transform(data);

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
