export interface EventFormData {
  event: string;
  title: string;
  description: string;
  link: string;
  category: string;
  type: string;
}

export interface Event {
  id?: any;
  date?: string;
  title: string;
  category?: string;
  description?: string;
  link?: string;
  type?: string;
  created_at?: string;
  event?: string;
  updated_at?: string;

}
