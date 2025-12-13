"use client"

import { useState } from 'react'
import { 
  ArticleData, 
  EventClientData, 
  EventData, 
  NewsletterData, 
  PaginationData, 
  Subscribers, 
  TeamData
} from '@seye-bamidele/shared-types';

function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return ''; 
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
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
      const baseUrl = getBaseUrl()
      const result = await apiFetch(`${baseUrl}/api/${endpoint}${queryString}`)
      
      if (result.data && result.pagination) {
        setData(result.data)
        setPagination(result.pagination)
        return result
      } else {
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
    const baseUrl = getBaseUrl()
    try {
      const result = await apiFetch(`${baseUrl}/api/${endpoint}?id=${id}`)
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
    const baseUrl = getBaseUrl()
    try {
      const result = await apiFetch(`${baseUrl}/api/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
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
    const baseUrl = getBaseUrl()
    try {
      const result = await apiFetch(`${baseUrl}/api/${endpoint}?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
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
      const baseUrl = getBaseUrl()
      await apiFetch(`${baseUrl}/api/${endpoint}?id=${id}${permanentParam}`, {
        method: 'DELETE',
      })
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

export function useSubscribers() {
  return useCrud<Subscribers>('subscribers')
}

export function useArticles() {
  return useCrud<ArticleData>('article')
}

export function useEvents() {
  return useCrud<EventData>('event')
}

export function useClientEvents() {
  return useCrud<EventClientData>('event')
}

export function useTeam() {
  return useCrud<TeamData>('team')
}

export function useNewsletter() {
  return useCrud<NewsletterData>('newsletters')
}