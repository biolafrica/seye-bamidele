import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Get newsletter details
    const { data: newsletter, error: newsletterError } = await supabaseAdmin
    .from('newsletters')
    .select('*')
    .eq('id', id)
    .single();

    if (newsletterError) throw newsletterError;

    // Calculate stats from newsletter record
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

    // Get unique opens count
    const { data: uniqueOpens, error: uniqueOpensError } = await supabaseAdmin
      .from('email_analytics')
      .select('subscriber_id')
      .eq('newsletter_id', id)
      .eq('event_type', 'opened');

    if (uniqueOpensError) {
      console.error('Error fetching unique opens:', uniqueOpensError);
    }

    // Get unique clicks with URLs
    const { data: uniqueClicks, error: uniqueClicksError } = await supabaseAdmin
      .from('email_analytics')
      .select('subscriber_id, link_url')
      .eq('newsletter_id', id)
      .eq('event_type', 'clicked');

    if (uniqueClicksError) {
      console.error('Error fetching unique clicks:', uniqueClicksError);
    }

    const uniqueOpensCount = new Set(uniqueOpens?.map(o => o.subscriber_id) || []).size;
    const uniqueClicksCount = new Set(uniqueClicks?.map(c => c.subscriber_id) || []).size;

    // Get click breakdown by URL
    const clicksByUrl: Record<string, number> = {};
    uniqueClicks?.forEach(click => {
      if (click.link_url) {
        clicksByUrl[click.link_url] = (clicksByUrl[click.link_url] || 0) + 1;
      }
    });

    return NextResponse.json({
      success: true,
      newsletter: {
        id: newsletter.id,
        subject: newsletter.subject,
        sent_at: newsletter.sent_at,
      },
      stats,
      uniqueOpens: uniqueOpensCount,
      uniqueClicks: uniqueClicksCount,
      clicksByUrl,
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}