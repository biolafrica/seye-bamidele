import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/get_client_ip';
import { analyticsService } from '@/app/utils/services/analyticServices';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const newsletterId = searchParams.get('nid');
  const subscriberId = searchParams.get('sid');

  if (newsletterId && subscriberId) {
    try {
      const isFirstOpen = !(await analyticsService.hasEventOccurred(
        newsletterId,
        subscriberId,
        'opened'
      ));

      await analyticsService.recordEvent({
        newsletter_id: newsletterId,
        subscriber_id: subscriberId,
        event_type: 'opened',
        ip_address: getClientIP(request),
        user_agent: request.headers.get('user-agent') || 'unknown',
      });

      await analyticsService.incrementNewsletterCounter(newsletterId, 'opens');

      if (isFirstOpen) {
        await analyticsService.incrementNewsletterCounter(newsletterId, 'unique_opens');
      }
    } catch (error) {
      console.error('Tracking error:', error);
    }
  }

  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );

  return new NextResponse(pixel, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}