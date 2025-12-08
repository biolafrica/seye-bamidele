import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { getClientIP } from '@/lib/get_client_ip';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const newsletterId = searchParams.get('nid');
  const subscriberId = searchParams.get('sid');

  console.log('Open tracking request received with newsletterId:', newsletterId, 'subscriberId:', subscriberId);

  if (newsletterId && subscriberId) {
    try {
      
      //check
      const { data: existingOpen, error: checkError } = await supabaseAdmin
      .from('email_analytics')
      .select('id')
      .eq('newsletter_id', newsletterId)
      .eq('subscriber_id', subscriberId)
      .eq('event_type', 'opened')
      .maybeSingle(); 

      console.log('Existing open check result:', existingOpen);
      const isFirstOpen = !existingOpen;

      //record open
      const { error: insertError } = await supabaseAdmin
      .from('email_analytics')
      .insert([
        {
          newsletter_id: newsletterId,
          subscriber_id: subscriberId,
          event_type: 'opened',
          ip_address: getClientIP(request),
          user_agent: request.headers.get('user-agent') || 'unknown',
        },
      ]);

      if (insertError) {console.error('Error inserting open event:', insertError)}

      // increase total open
      const { error: rpcOpenError } = await supabaseAdmin.rpc( 'increment_newsletter_opens', { nid: newsletterId })
      if (rpcOpenError) { console.error('Error incrementing opens:', rpcOpenError)}


      if (isFirstOpen) {
        console.log('This is the first open for subscriber:', subscriberId, 'and newsletter:', newsletterId);

        // increase unique opens
        const { error: rpcError } = await supabaseAdmin.rpc('increment_newsletter_unique_opens', { nid: newsletterId });
        if (rpcError) { console.error('Error unique incrementing opens:', rpcError)}
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
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}