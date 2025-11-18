import { Event } from "@/types/events";

type Category = 'conference' | 'show' | 'podcast' | '';
type Type = 'audio' | 'video' | 'article' | '';

type BackendEvent = {
  id: string;
  created_at: string;
  category: Category;
  event: string;
  title: string;
  description: string;
  link: string;
  type: Type;
  updated_at?: string ;
};

export function transformEvents(data?: BackendEvent[] | null): Event[] {
  if (!data) return [];

  return data.map((item, index) => ({
    id: index + 1,
    title: item.title,
    date: new Date(item.created_at).toLocaleDateString("en-GB").replace(/\//g, "-"),
    category: item.category,
    event: item.event,
    description: item.description,
    link: item.link,
    type: item.type,
    created_at: item.created_at,
    updated_at: item.updated_at ?? undefined,
  }));
}
