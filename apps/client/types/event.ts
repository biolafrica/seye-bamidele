export interface DbEvent {
  id?: string;
  created_at?: string;
  category: string ;
  event: string;
  title: string;
  description?: string;
  link: string;
  type: string;

}

export interface SpeakingEvent {
  category: string ;
  event: string;
  title: string;
  description?: string;
  link: {
    text: string;
    url: string;
  };
}

