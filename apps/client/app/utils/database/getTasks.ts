import { createClient } from "../supabase/server";
import type { SupabaseClient } from '@supabase/supabase-js';

// Define types for your database tables
type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  // Add other fields as needed
};

type Events = {
  id: string;
  category: string;
  event: string;
  title: string;
  created_at: string;
  description: string;
  link: string;
  type: string;
};

// Generic reusable fetch function
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

// Specific functions built from the reusable function
export async function getArticles(): Promise<Article[]> {
  return fetchFromTable<Article>("Articles");
}

export async function getEvents(): Promise<Events[]> {
  return fetchFromTable<Events>("Events");
}