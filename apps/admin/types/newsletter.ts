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

export interface AnalyticsData {
  newsletter: {
    id: string;
    subject: string;
    content: string;
    sent_at: string;
  };
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    openRate: string;
    clickRate: string;
  };
  uniqueOpens: number;
  uniqueClicks: number;
  clicksByUrl: Record<string, number>;
}

export interface NewsletterAnalyticsPageProps {
  id: string;
  content: any;
}