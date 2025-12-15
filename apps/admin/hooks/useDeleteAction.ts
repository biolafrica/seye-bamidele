'use client';

import { useState } from 'react';

interface UseDeleteActionOptions<T> {
  onDelete: (item: T) => Promise<void>;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: unknown) => void;
}

export function useDeleteAction<T>({
  onDelete,
  onSuccess,
  onError,
}: UseDeleteActionOptions<T>) {
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const requestDelete = (item: T) => {
    setItemToDelete(item);
    setShowDialog(true);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setLoading(true);
      await onDelete(itemToDelete);
      await onSuccess?.();
    } catch (error) {
      onError?.(error);
    } finally {
      setLoading(false);
      cancelDelete();
    }
  };

  return {
    showDialog,
    loading,
    itemToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
  };
}

