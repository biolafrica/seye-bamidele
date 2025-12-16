import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/get_client_ip';
import { analyticsService } from '@/app/utils/services/analyticServices';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const newsletterId = searchParams.get('nid');
  const subscriberId = searchParams.get('sid');
  const url = searchParams.get('url');

  if (newsletterId && subscriberId && url) {
    try {

      const isFirstClick = await analyticsService.recordEvent({
        newsletter_id: newsletterId,
        subscriber_id: subscriberId,
        event_type: 'clicked',
        link_url: url,
        ip_address: getClientIP(request),
        user_agent: request.headers.get('user-agent') || 'unknown',
      });


      await analyticsService.incrementNewsletterCounter(newsletterId, 'clicks');


      if (isFirstClick) {
        await analyticsService.incrementNewsletterCounter(newsletterId, 'unique_clicks');
      }

      console.log(`Click tracked: newsletter=${newsletterId}, subscriber=${subscriberId}, unique=${isFirstClick}`);
    } catch (error) {
      console.error('Click tracking error:', error);

    }
  } else {
    console.warn('Missing tracking parameters:', { newsletterId, subscriberId, url });
  }

  if (url) {
    try {
      const decodedUrl = decodeURIComponent(url);
      
      new URL(decodedUrl);
      
      return NextResponse.redirect(decodedUrl);
    } catch (error) {
      console.error('URL decode/validation error:', error);
      try {
        new URL(url);
        return NextResponse.redirect(url);
      } catch {
        return NextResponse.json(
          { error: 'Invalid URL format' },
          { status: 400 }
        );
      }
    }
  }

  return NextResponse.json(
    { error: 'Missing URL parameter' },
    { status: 400 }
  );
}