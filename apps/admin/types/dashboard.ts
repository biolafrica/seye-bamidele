export interface DashboardStats {
  totalSubscribers: number;
  totalNewsletters: number;
  totalArticles: number;
  totalEvents: number;
}

export interface RecentSubscriber {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface RecentArticle {
  id: string;
  title: string;
  created_at: string;
  status?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentSubscribers: RecentSubscriber[];
  recentArticles: RecentArticle[];
}


export interface BaseListItemProps {
  timestamp: string;
  className?: string;
}

export interface ListItemContentProps {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  badge?: React.ReactNode;
}