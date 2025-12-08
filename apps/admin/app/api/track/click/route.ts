import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { getClientIP } from '@/lib/get_client_ip';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const newsletterId = searchParams.get('nid');
  const subscriberId = searchParams.get('sid');
  const url = searchParams.get('url');
  
  console.log('Click tracking request received with newsletterId:', newsletterId, 'subscriberId:', subscriberId, 'url:', url);

  if (newsletterId && subscriberId && url) {
    try {
      
      // Check 
      const { data: existingClick, error: checkError } = await supabaseAdmin
        .from('email_analytics')
        .select('id')
        .eq('newsletter_id', newsletterId)
        .eq('subscriber_id', subscriberId)
        .eq('event_type', 'clicked')
        .maybeSingle(); 

      console.log('Existing click check result:', existingClick);
      const isFirstClick = !existingClick;

      // Record the click event
      const { error: insertError } = await supabaseAdmin
        .from('email_analytics')
        .insert([
          {
            newsletter_id: newsletterId,
            subscriber_id: subscriberId,
            event_type: 'clicked',
            link_url: url,
            ip_address: getClientIP(request),
            user_agent: request.headers.get('user-agent') || 'unknown',
          },
        ]);

      if (insertError) {
        console.error('Error inserting click event:', insertError);
      }

      // Increment total clicks count
      const { error: rpcClickError } = await supabaseAdmin.rpc(
        'increment_newsletter_clicks',
        { nid: newsletterId } 
      );

      if (rpcClickError) {
        console.error('Error incrementing clicks:', rpcClickError);
      }

      // If this is the first click from this subscriber, increment unique clicks
      if (isFirstClick) {
        console.log('This is the first click for subscriber:', subscriberId, 'and newsletter:', newsletterId);

        const { error: rpcUniqueError } = await supabaseAdmin.rpc(
          'increment_newsletter_unique_clicks', 
          { nid: newsletterId }
        );

        if (rpcUniqueError) {
          console.error('Error incrementing unique clicks:', rpcUniqueError);
        }
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