import { DbEvent } from "@/types/event";
import { createClient } from "../supabase/server";
import type { SupabaseClient } from '@supabase/supabase-js';
import { DBArticle } from "@/types/article";


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
  return fetchAll<DBArticle>("Articles");
}

export async function getArticleById(id: string | number): Promise<DBArticle | null> {
  return fetchById<DBArticle>("Articles", id);
}

export async function getEvents(): Promise<DbEvent[]> {
  return fetchAll<DbEvent>("Events");
}
