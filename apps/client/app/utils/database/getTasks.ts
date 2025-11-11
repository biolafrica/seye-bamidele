import { DbEvent } from "@/types/event";
import { createClient } from "../supabase/server";
import type { SupabaseClient } from '@supabase/supabase-js';
import { DBArticle } from "@/types/article";


async function fetchFromTable<T>(
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

export async function getArticles(): Promise<DBArticle[]> {
  return fetchFromTable<DBArticle>("Articles");
}

export async function getEvents(): Promise<DbEvent[]> {
  return fetchFromTable<DbEvent>("Events");
}