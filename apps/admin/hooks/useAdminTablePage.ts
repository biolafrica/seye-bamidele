'use client';

import { useEffect, useState } from 'react';

interface UseAdminTablePageParams<T> {
  useSource: () => {
    data: T[];
    pagination: any;
    loading: boolean;
    getAll: (params: Record<string, string>) => Promise<void>;
    remove?: (id: string) => Promise<void>;
  };
}

export function useAdminTablePage<T>({ useSource }: UseAdminTablePageParams<T>) {
  const { data, pagination, loading, getAll, remove } = useSource();

  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page?: number, limit?: number) => {
    await getAll({
      page: String(page || pagination.page),
      limit: String(limit || pagination.limit),
      sortBy,
      sortOrder,
    });
  };

  const handlePageChange = (page: number) => {
    fetchData(page, pagination.limit);
  };

  const handleItemsPerPageChange = (limit: number) => {
    fetchData(1, limit);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc' | null) => {
    const newSortBy = direction ? key : 'created_at';
    const newSortOrder = direction || 'desc';

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);

    getAll({
      page: '1',
      limit: pagination.limit.toString(),
      sortBy: newSortBy,
      sortOrder: newSortOrder,
    });
  };

  return {
    data,
    pagination,
    loading,
    sortBy,
    sortOrder,
    fetchData,
    handlePageChange,
    handleItemsPerPageChange,
    handleSort,
    remove,
  };
}
