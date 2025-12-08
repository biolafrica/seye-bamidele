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
      // Check if this is the first click
      const isFirstClick = !(await analyticsService.hasEventOccurred(
        newsletterId,
        subscriberId,
        'clicked'
      ));

      // Record the click event
      await analyticsService.recordEvent({
        newsletter_id: newsletterId,
        subscriber_id: subscriberId,
        event_type: 'clicked',
        link_url: url,
        ip_address: getClientIP(request),
        user_agent: request.headers.get('user-agent') || 'unknown',
      });

      // Increment total clicks
      await analyticsService.incrementNewsletterCounter(newsletterId, 'clicks');

      // Increment unique clicks if first time
      if (isFirstClick) {
        await analyticsService.incrementNewsletterCounter(newsletterId, 'unique_clicks');
      }
    } catch (error) {
      console.error('Click tracking error:', error);
    }
  }

  // Redirect to the actual URL
  if (url) {
    return NextResponse.redirect(decodeURIComponent(url));
  }

  return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
}