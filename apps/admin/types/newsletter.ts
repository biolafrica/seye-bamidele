export interface NewsletterFormData { 
  subject: string;
  content: string;  
}

export interface Newsletter { 
  subject?: string;
  content?: string;  
  id?: any;
  date?: string ;
  created_at?: string;
}