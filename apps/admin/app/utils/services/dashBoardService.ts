import { SupabaseQueryBuilder } from '../supabase/queryBuilder';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

interface DashboardStats {
  totalSubscribers: number;
  totalNewsletters: number;
  totalArticles: number;
  totalEvents: number;
}

interface RecentSubscriber {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

interface RecentArticle {
  id: string;
  title: string;
  created_at: string;
  status?: string;
}

class DashboardService {
  private subscriberQuery = new SupabaseQueryBuilder<RecentSubscriber>('subscribers');
  private articleQuery = new SupabaseQueryBuilder<RecentArticle>('Articles');
  private newsletterQuery = new SupabaseQueryBuilder<any>('newsletters');
  private eventQuery = new SupabaseQueryBuilder<any>('Events');

  async getStats(): Promise<DashboardStats> {
    const [
      totalSubscribers,
      totalNewsletters,
      totalArticles,
      totalEvents,
    ] = await Promise.all([
      this.subscriberQuery.count(),
      this.newsletterQuery.count(),
      this.articleQuery.count(),
      this.eventQuery.count(),
    ]);

    return {
      totalSubscribers,
      totalNewsletters,
      totalArticles,
      totalEvents,
    };
  }

  async getRecentSubscribers(limit: number = 5): Promise<RecentSubscriber[]> {
    const { data } = await supabaseAdmin
    .from('subscribers')
    .select('id, email, name, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

    return data || [];
  }

  async getRecentArticles(limit: number = 5): Promise<RecentArticle[]> {
    const { data } = await supabaseAdmin
    .from('Articles')
    .select('id, title, created_at,status')
    .order('created_at', { ascending: false })
    .limit(limit);

    console.log('Recent Articles Data:', data);

    return data || [];
  }

  async getDashboardData() {
    const [stats, recentSubscribers, recentArticles] = await Promise.all([
      this.getStats(),
      this.getRecentSubscribers(),
      this.getRecentArticles(),
    ]);

    return {
      stats,
      recentSubscribers,
      recentArticles,
    };
  }
}

export const dashboardService = new DashboardService();