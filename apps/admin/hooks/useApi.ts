import { Article } from '@/types/articles'
import { Event } from '@/types/events'
import { TeamFormData } from '@/types/team'
import { useState } from 'react'

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationData;
}

async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'API request failed')
  }

  return response.json()
}

export function useCrud<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (params?: Record<string, string>) => {
    setLoading(true)
    setError(null)
    try {
      const queryString = params 
        ? '?' + new URLSearchParams(params).toString()
        : ''
      const result = await apiFetch(`/api/${endpoint}${queryString}`)
      
      // Check if response has pagination structure
      if (result.data && result.pagination) {
        setData(result.data)
        setPagination(result.pagination)
        return result
      } else {
        // Fallback for non-paginated responses
        setData(result)
        return { data: result }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getOne = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFetch(`/api/${endpoint}?id=${id}`)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Partial<T>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFetch(`/api/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      // Refetch to update pagination
      await getAll({ 
        page: pagination.page.toString(), 
        limit: pagination.limit.toString() 
      })
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: Partial<T>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFetch(`/api/${endpoint}?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      // Refetch to update data
      await getAll({ 
        page: pagination.page.toString(), 
        limit: pagination.limit.toString() 
      })
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string, permanent = false) => {
    setLoading(true)
    setError(null)
    try {
      const permanentParam = permanent ? '&permanent=true' : ''
      await apiFetch(`/api/${endpoint}?id=${id}${permanentParam}`, {
        method: 'DELETE',
      })
      // Refetch to update pagination
      await getAll({ 
        page: pagination.page.toString(), 
        limit: pagination.limit.toString() 
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    pagination,
    loading,
    error,
    getAll,
    getOne,
    create,
    update,
    remove,
  }
}

export function useArticles() {
  return useCrud<Article>('article')
}

export function useEvents() {
  return useCrud<Event>('event')
}

export function useTeam() {
  return useCrud<TeamFormData>('team')
}