import { createClient } from "../supabase/server";
import type { SupabaseClient } from '@supabase/supabase-js';
import { ArticleData } from "@seye-bamidele/shared-types";

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

export async function getArticleById(id: string | number): Promise<ArticleData | null> {
  return fetchById<ArticleData>("articles", id);
}




