import { SupabaseQueryBuilder } from '../supabase/queryBuilder';
import { sendTrackedNewsletter } from '../common/sendGrid';
import { analyticsService } from './analyticServices';

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  total_sent: number;
  created_at?: string;
  sent_at?: string;
}

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  unsubscribe_token: string;
  is_active: boolean;
}

interface SendNewsletterResult {
  success: boolean;
  message: string;
  newsletterId: string;
  sent?: number;
  error?: string;
}

class NewsletterService {
  private newsletterQuery = new SupabaseQueryBuilder<Newsletter>('newsletters');
  private subscriberQuery = new SupabaseQueryBuilder<Subscriber>('subscribers');

  async getActiveSubscribers(): Promise<Subscriber[]> {
    return this.subscriberQuery.findByCondition('is_active', true);
  }

  async createNewsletter(subject: string, content: string, totalSent: number): Promise<Newsletter> {
    return this.newsletterQuery.create({
      subject,
      content,
      total_sent: totalSent,
      sent_at: new Date().toISOString(),
    } as Partial<Newsletter>);
  }

  async recordSentEvents(newsletterId: string, subscriberIds: string[]): Promise<void> {
    const analyticsRecords = subscriberIds.map(subscriberId => ({
      newsletter_id: newsletterId,
      subscriber_id: subscriberId,
      event_type: 'sent' as const,
    }));

    await analyticsService.bulkRecordEvents(analyticsRecords);
  }

  async sendNewsletter(
    subject: string,
    content: string
  ): Promise<SendNewsletterResult> {
    if (!subject || !content) {
      return {
        success: false,
        message: 'Subject and content are required',
        newsletterId: '',
        sent: 0,
        error: 'Subject and content are required',
      };
    }

    const subscribers = await this.getActiveSubscribers();

    if (!subscribers || subscribers.length === 0) {
      return {
        success: false,
        message: 'No active subscribers found',
        newsletterId: '',
        sent: 0,
        error: 'No active subscribers found',
      };
    }

    const newsletter = await this.createNewsletter(
      subject,
      content,
      subscribers.length
    );

    const sendResult = await sendTrackedNewsletter(
      subscribers,
      subject,
      content,
      newsletter.id
    );

    if (!sendResult.success) {
      return {
        success: false,
        message: 'Failed to send newsletter',
        newsletterId: newsletter.id,
        sent: 0,
        error: sendResult.error,
      };
    }

    await this.recordSentEvents(
      newsletter.id,
      subscribers.map(sub => sub.id)
    );

    return {
      success: true,
      message: `Newsletter sent to ${sendResult.sent} subscribers`,
      newsletterId: newsletter.id,
      sent: sendResult.sent,
    };
  }
}

export const newsletterService = new NewsletterService();