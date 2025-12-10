export interface BaseEntity {
  id: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface BaseEntityWithStatus extends BaseEntity {
  status: 'string';
}

export interface TimestampMeta {
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date | string | null;
  deletedBy?: string | null;
}

export interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export interface ImageMeta {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  credits?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: PaginationMeta;
    [key: string]: any;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}