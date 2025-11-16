type Category = 'conference' | 'show' | 'podcast' | '';
type Type = 'audio' | 'video' | 'article' | '';

export interface EventFormData {
  event: string;
  title: string;
  description: string;
  link: string;
  category: Category;
  type: Type;
}

export interface Event {
  id: number;
  date: string;
  title: string;
  category?: string;
}