"use client"

import { useState } from 'react'

export interface Subscribers {
  email: string;
}

export interface Article {
  id?: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  image1: string;
  image2: string;
  created_at: string;
  content: string;
}

export interface Event {
  id?: any;
  date?: string;
  title: string;
  category: string;
  description?: string;
  link: string;
  type: string;
  created_at?: string;
  event: string;
  updated_at?: string;

}

export interface TeamFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface NewsletterFormData { 
  subject: string;
  content: string;  
}


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
      const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}${queryString}`)
      
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
    try {
      const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}?id=${id}`)
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
      const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
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
    try {
      const result = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}?id=${id}`, {
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
      await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}?id=${id}${permanentParam}`, {
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
  return useCrud<Article>('article')
}

export function useEvents() {
  return useCrud<Event>('event')
}

export function useTeam() {
  return useCrud<TeamFormData>('team')
}

export function useNewsletter() {
  return useCrud<NewsletterFormData>('newsletters')
}