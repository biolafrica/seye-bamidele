export interface EventBase{
  id: string;
  created_at: string;
  updated_at?: string;
  event: string;
  description: string;
  type: string;
  category: string;
  title: string;
  link: string;
}


export type EventFormData = Omit<EventBase, 'id' | 'created_at' | 'updated_at'>;  
export type EventSidePanel = Omit<EventBase, 'updated_at'|'created_at'>;
export type EventData = Omit<EventBase, 'updated_at'>;
export type EventClientData = EventFormData;
export type EventTableData = Pick<EventBase, 'created_at' | 'event' | 'title' | 'category'>;
export type EventTransformedData = Omit<EventBase, 'link' | 'id' | 'created_at' | 'updated_at' | 'type'> & {
  link: {
    text: string;
    url: string;
  };
};
