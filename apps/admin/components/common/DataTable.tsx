'use client';

import React, { useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
  stickyFirstColumn?: boolean;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  showPagination?: boolean;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  showActions = true,
  stickyFirstColumn = true,
  itemsPerPageOptions = [10, 20,],
  defaultItemsPerPage = 10,
  showPagination = true,
  className = '',
  emptyMessage = 'No data available',
  loading = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    if (!sortConfig || sortConfig.key !== column.key) {
      return <ChevronUpDownIcon className="h-4 w-4 text-secondary" />;
    }

    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 text-accent" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-accent" />
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Table Container */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* Table Header */}
            <thead>
              <tr className="bg-hover border-b border-separator">
                {columns.map((column, index) => (
                  <th
                    key={column.key as string}
                    className={`
                      px-6 py-4 text-left text-sm font-medium text-secondary
                      ${column.sortable ? 'cursor-pointer select-none hover:text-heading' : ''}
                      ${column.headerClassName || ''}
                      ${stickyFirstColumn && index === 0 ? 'sticky left-0 z-10 bg-hover' : ''}
                    `}
                    onClick={() => column.sortable && handleSort(column.key as string)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {getSortIcon(column)}
                    </div>
                  </th>
                ))}
                {showActions && (
                  <th className="px-6 py-4 text-left text-sm font-medium text-secondary">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-separator">
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className="px-6 py-12 text-center text-secondary"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                currentData.map((row, rowIndex) => (
                  <tr
                    key={row.id || rowIndex}
                    className="hover:bg-hover transition-colors"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={`${row.id || rowIndex}-${column.key as string}`}
                        className={`
                          px-6 py-4 text-sm text-text whitespace-nowrap
                          ${column.className || ''}
                          ${stickyFirstColumn && colIndex === 0 
                            ? 'sticky left-0 z-10 bg-card font-medium' 
                            : ''
                          }
                        `}
                      >
                        {column.accessor
                          ? column.accessor(row)
                          : (row[column.key as keyof T] as React.ReactNode)}
                      </td>
                    ))}
                    {showActions && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-2 hover:bg-hover rounded-lg transition-colors group"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4 text-secondary group-hover:text-accent" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-2 hover:bg-hover rounded-lg transition-colors group"
                              title="Delete"
                            >
                              <TrashIcon className="h-4 w-4 text-secondary group-hover:text-[var(--btn-danger-bg)]" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {showPagination && data.length > 0 && (
          
          <div className="px-6 py-4 bg-background border-t border-separator">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-secondary">
                  Items per page
                </span>
                <span className="text-sm text-secondary ml-4">
                  {startIndex + 1}-{Math.min(endIndex, sortedData.length)} of {sortedData.length} items
                </span>
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-1">
                {/* Previous button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm text-secondary hover:text-heading disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {/* Page numbers */}
                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    disabled={page === '...'}
                    className={`
                      px-3 py-1.5 text-sm rounded-lg transition-colors
                      ${page === currentPage
                        ? 'bg-accent text-white'
                        : page === '...'
                        ? 'cursor-default text-secondary'
                        : 'hover:bg-hover text-secondary hover:text-heading'
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm text-secondary hover:text-heading disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;