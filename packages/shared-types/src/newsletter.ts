export interface NewsletterBase{
  id: string;
  subject: string;
  content: string;
  sent_at: string;
  total_sent: number;
  created_by: string ;
  created_at: string;
  total_delivered: number ;
  total_opened: number ;
  total_clicked: number ;
  total_bounce: number ;
  total_unsubscribed: number;
  total_unique_opened: number ;
  total_unique_clicked: number ;
}

export interface NewsletterAnalytics{
  newsletter:{
    id: string;
    subject: string;
    sent_at: string;
  };
  stats:{
    sent: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    openRate: string;
    clickRate: string;
  }
  uniqueOpens: number;
  uniqueClicks: number;
  clicksByUrl: Record<string, number>;
}

export type NewsletterSidePanel = Pick<NewsletterBase, "id" | "content" >
export type NewsletterFormData = Pick<NewsletterBase, "content" | "subject" >
export type NewsletterData = Omit<NewsletterBase, 'created_by'>
export type NewsletterTableData = Pick<NewsletterBase, 'created_at'| 'subject'>
export type NewsletterRouteData = Pick<NewsletterBase, 'id' | 'subject' | 'sent_at' | 'total_sent' | 'total_opened' | 'total_clicked' | 'total_unsubscribed'>
