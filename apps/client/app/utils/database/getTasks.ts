import { DbEvent } from "@/types/event";
import { createClient } from "../supabase/server";
import type { SupabaseClient } from '@supabase/supabase-js';
import { DBArticle } from "@/types/article";
import { getCacheHeaders } from "@seye-bamidele/config";

export function cachePublicShort() {
  return getCacheHeaders('apiShort')
}



async function fetchAll<T>(
  tableName: string,
  selectQuery: string = "*"
): Promise<T[]> {
  const supabase: SupabaseClient = await createClient();

  const { data, error } = await supabase
    .from(tableName)
    .select(selectQuery);

  if (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    throw new Error(`Failed to fetch ${tableName}: ${error.message}`);
  }

  return data as T[];
}

async function fetchById<T>(
  tableName: string,
  id: string | number,
  selectQuery: string = "*"
): Promise<T | null> {
  const supabase: SupabaseClient = await createClient();

  const { data, error } = await supabase
  .from(tableName)
  .select(selectQuery)
  .eq("id", id)
  .single();

  if (error) {
    console.error(`Error fetching ${tableName} by id:`, error.message);
    throw new Error(`Failed to fetch ${tableName} by id: ${error.message}`);
  }

  return data as T;
}

export async function getArticles(): Promise<DBArticle[]> {
  return fetchAll<DBArticle>("articles");
}

export async function getArticleById(id: string | number): Promise<DBArticle | null> {
  return fetchById<DBArticle>("articles", id);
}

export async function getEvents(): Promise<DbEvent[]> {
  return fetchAll<DbEvent>("events");
}

async function fetchPaginated<T>(
  tableName: string,
  page: number,
  limit: number,
  selectQuery: string = "*"
): Promise<{ data: T[]; hasMore: boolean }> {
  const supabase: SupabaseClient = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from(tableName)
    .select(selectQuery, { count: "exact" })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    data: data as T[],
    hasMore: count !== null ? to + 1 < count : false, 
  };
}

export async function getPaginatedArticles(page: number, limit: number) {
  return fetchPaginated<DBArticle>("articles", page, limit);
}

export async function getPaginatedEvents(page: number, limit: number) {
  return fetchPaginated<DbEvent>("events", page, limit);
}


