import { NextRequest, } from 'next/server';
import { handleError, successResponse } from '@/app/utils/common/serverResponse';
import { SupabaseQueryBuilder } from '@/app/utils/supabase/queryBuilder';
import { analyticsService } from '@/app/utils/services/analyticServices';
import { NewsletterRouteData } from '@seye-bamidele/shared-types';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const newsletterQuery = new SupabaseQueryBuilder<NewsletterRouteData>('newsletters');

    const newsletter = await newsletterQuery.findById(id);

    const stats = {
      sent: newsletter.total_sent || 0,
      opened: newsletter.total_opened || 0,
      clicked: newsletter.total_clicked || 0,
      unsubscribed: newsletter.total_unsubscribed || 0,
      openRate: newsletter.total_sent > 0
        ? ((newsletter.total_opened / newsletter.total_sent) * 100).toFixed(2)
        : '0.00',
      clickRate: newsletter.total_sent > 0
        ? ((newsletter.total_clicked / newsletter.total_sent) * 100).toFixed(2)
        : '0.00',
    };

    const [uniqueOpens, uniqueClicks, clicksByUrl] = await Promise.all([
      analyticsService.getUniqueCount(id, 'opened'),
      analyticsService.getUniqueCount(id, 'clicked'),
      analyticsService.getClicksByUrl(id)
    ]);

    return successResponse({
      newsletter: {
        id: newsletter.id,
        subject: newsletter.subject,
        sent_at: newsletter.sent_at,
        
      },
      stats,
      uniqueOpens,
      uniqueClicks,
      clicksByUrl,
    });
  } catch (error) {
    return handleError(error);
  }
}