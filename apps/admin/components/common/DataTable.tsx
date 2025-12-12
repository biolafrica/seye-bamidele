'use client';

import React from 'react';
import {
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';
import TableSkeleton from '../skeleton/tableSkeleton';
import { PaginationData } from '@seye-bamidele/shared-types';
import EmptyState from './Empty';


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
  pagination: PaginationData;
  loading?: boolean;
  

  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc' | null) => void;
  

  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onMore?: (item: T) => void;
  showActions?: boolean;
  stickyFirstColumn?: boolean;
  itemsPerPageOptions?: number[];
  className?: string;
  emptyMessage: {
    title: string;
    message: string
  };
  skeletonRows?: number;
  

  sortBy?: string;
  sortOrder?: 'asc' | 'desc' | null;
}


function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  pagination,
  loading = false,
  onPageChange,
  onItemsPerPageChange,
  onSort,
  onEdit,
  onDelete,
  onMore,
  showActions = true,
  stickyFirstColumn = true,
  itemsPerPageOptions = [10, 20, 50, 100],
  className = '',
  emptyMessage,
  skeletonRows = 3,
  sortBy,
  sortOrder,
}: DataTableProps<T>) {

  const finalEmptyMessage = emptyMessage || {
    title: "No data available",
    message: "Get started by creating a new item"
  };

  
  const { page, limit, total, totalPages } = pagination;
  const startIndex = (page - 1) * limit;

  const handleSort = (key: string) => {
    if (!onSort) return;
    
    let newDirection: 'asc' | 'desc' | null = 'asc';
    
    if (sortBy === key) {
      if (sortOrder === 'asc') {
        newDirection = 'desc';
      } else if (sortOrder === 'desc') {
        newDirection = null;
      }
    }
    
    onSort(key, newDirection);
  };

  const handleItemsPerPageChange = (value: string) => {
    onItemsPerPageChange(Number(value));
  };

  const goToPage = (newPage: number) => {
    onPageChange(newPage);
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(page);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    const isActive = sortBy === column.key;
    
    if (!isActive || !sortOrder) {
      return <ChevronUpDownIcon className="h-4 w-4 text-secondary" />;
    }

    return sortOrder === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 text-accent" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-accent" />
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
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

            <tbody className="divide-y divide-separator">
              
              {loading ? (
                <TableSkeleton
                  columns={columns.length} 
                  rows={skeletonRows}
                  showActions={showActions}
                />
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (showActions ? 1 : 0)}
                    className="px-6 py-12 text-center text-secondary"
                  >
                    <EmptyState
                      title={finalEmptyMessage.title}
                      message={finalEmptyMessage.message}
                    />

                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
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

                          {onMore && (
                            <button
                              onClick={() => onMore(row)}
                              className="p-2 hover:bg-hover rounded-lg transition-colors group"
                              title="More"
                            >
                              <DocumentArrowUpIcon className="h-4 w-4 text-secondary group-hover:text-green-600" />
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


        {(total > 0 || loading) && (
          <div className="px-6 py-4 bg-background border-t border-separator">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <select
                  value={limit}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  disabled={loading}
                  className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
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
                {!loading && (
                  <span className="text-sm text-secondary ml-4">
                    {startIndex + 1}-{Math.min(startIndex + limit, total)} of {total} items
                  </span>
                )}
                {loading && (
                  <span className="text-sm text-secondary ml-4">
                    ...
                  </span>
                )}
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1 || loading}
                  className="px-3 py-1.5 text-sm text-secondary hover:text-heading disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {generatePageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === 'number' && goToPage(pageNum)}
                    disabled={pageNum === '...' || loading}
                    className={`
                      px-3 py-1.5 text-sm rounded-lg transition-colors
                      ${pageNum === page
                        ? 'bg-accent text-white'
                        : pageNum === '...'
                        ? 'cursor-default text-secondary'
                        : 'hover:bg-hover text-secondary hover:text-heading'
                      }
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages || loading}
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