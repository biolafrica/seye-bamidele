import { SupabaseQueryBuilder } from '../supabase/queryBuilder';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

interface AnalyticsEvent {
  newsletter_id: string;
  subscriber_id: string;
  event_type: 'sent' | 'opened' | 'clicked' | 'unsubscribed';
  link_url?: string;
  ip_address?: string;
  user_agent?: string;
}

class AnalyticsService {
  private analyticsQuery = new SupabaseQueryBuilder<AnalyticsEvent>('email_analytics');

  async recordEvent(event: AnalyticsEvent) {
    return this.analyticsQuery.create(event);
  }

  async bulkRecordEvents(events: AnalyticsEvent[]) {
    return this.analyticsQuery.bulkCreate(events);
  }

  async getUniqueCount(
    newsletterId: string,
    eventType: 'opened' | 'clicked'
  ): Promise<number> {
    const { data } = await supabaseAdmin
    .from('email_analytics')
    .select('subscriber_id')
    .eq('newsletter_id', newsletterId)
    .eq('event_type', eventType);

    return new Set(data?.map(d => d.subscriber_id) || []).size;
  }

  async hasEventOccurred(
    newsletterId: string,
    subscriberId: string,
    eventType: 'opened' | 'clicked'
  ): Promise<boolean> {
    const { data } = await supabaseAdmin
      .from('email_analytics')
      .select('id')
      .eq('newsletter_id', newsletterId)
      .eq('subscriber_id', subscriberId)
      .eq('event_type', eventType)
      .maybeSingle();

    return !!data;
  }

  async getClicksByUrl(newsletterId: string): Promise<Record<string, number>> {
    const { data } = await supabaseAdmin
      .from('email_analytics')
      .select('link_url')
      .eq('newsletter_id', newsletterId)
      .eq('event_type', 'clicked');

    const clicksByUrl: Record<string, number> = {};
    data?.forEach(click => {
      if (click.link_url) {
        clicksByUrl[click.link_url] = (clicksByUrl[click.link_url] || 0) + 1;
      }
    });

    return clicksByUrl;
  }

  async incrementNewsletterCounter(
    newsletterId: string,
    counterType: 'opens' | 'clicks' | 'unique_opens' | 'unique_clicks' | 'unsubscribes'
  ) {
    const rpcFunctionMap = {
      opens: 'increment_newsletter_opens',
      clicks: 'increment_newsletter_clicks',
      unique_opens: 'increment_newsletter_unique_opens',
      unique_clicks: 'increment_newsletter_unique_clicks',
      unsubscribes: 'increment_newsletter_unsubscribes',
    };

    const { error } = await supabaseAdmin.rpc(
      rpcFunctionMap[counterType],
      { nid: newsletterId }
    );

    if (error) throw error;
    return true;
  }
}

export const analyticsService = new AnalyticsService();