import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/get_client_ip';
import { analyticsService } from '@/app/utils/services/analyticServices';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const newsletterId = searchParams.get('nid');
  const subscriberId = searchParams.get('sid');

  // Always return the pixel, even if tracking fails
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );

  if (newsletterId && subscriberId) {
    try {
      // Record event and check if it's first occurrence
      const isFirstOpen = await analyticsService.recordEvent({
        newsletter_id: newsletterId,
        subscriber_id: subscriberId,
        event_type: 'opened',
        ip_address: getClientIP(request),
        user_agent: request.headers.get('user-agent') || 'unknown',
      });

      // Increment total opens counter
      await analyticsService.incrementNewsletterCounter(newsletterId, 'opens');

      // Increment unique opens if this was the first
      if (isFirstOpen) {
        await analyticsService.incrementNewsletterCounter(newsletterId, 'unique_opens');
      }

      console.log(`Open tracked: newsletter=${newsletterId}, subscriber=${subscriberId}, unique=${isFirstOpen}`);
    } catch (error) {
      console.error('Open tracking error:', error);
      // Don't fail the pixel response
    }
  } else {
    console.warn('Missing tracking parameters:', { newsletterId, subscriberId });
  }

  return new NextResponse(pixel, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
