import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const newsletterId = searchParams.get('nid');
  console.log('Unsubscribe request received with token:', token, 'and newsletterId:', newsletterId);

  if (!token) {
    return NextResponse.json(
      { error: 'Invalid unsubscribe link' },
      { status: 400 }
    );
  }

  try {
    const { data: subscriber, error } = await supabaseAdmin
      .from('subscribers')
      .select('id, email, is_active')
      .eq('unsubscribe_token', token)
      .single();
    
    

    if (error || !subscriber) {
      console.error('Subscriber not found:', error);
      return NextResponse.redirect(
        new URL('/unsubscribed?error=not_found', request.url)
      );
    }

    if (!subscriber.is_active) {
      return NextResponse.redirect(
        new URL('/unsubscribed?email=' + encodeURIComponent(subscriber.email) + '&already=true', request.url)
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('subscribers')
      .update({ is_active: false })
      .eq('unsubscribe_token', token);

    if (updateError) {
      console.error('Failed to unsubscribe:', updateError);
      return NextResponse.redirect(
        new URL('/unsubscribed?error=failed', request.url)
      );
    }

    if (newsletterId && subscriber.id) {
      try {
        const { error: insertError } = await supabaseAdmin
          .from('email_analytics')
          .insert([
            {
              newsletter_id: newsletterId,
              subscriber_id: subscriber.id,
              event_type: 'unsubscribed',
            },
          ]);

        if (insertError) {
          console.error('Error inserting unsubscribe event:', insertError);
        }

        const { error: rpcError } = await supabaseAdmin.rpc(
          'increment_newsletter_unsubscribes',
          { nid: newsletterId } 
        );

        if (rpcError) {
          console.error('Error incrementing unsubscribes:', rpcError);
        }

      } catch (analyticsError) {
        console.error('Error tracking unsubscribe:', analyticsError);
      }
    }

    return NextResponse.redirect(
      new URL('/unsubscribed?email=' + encodeURIComponent(subscriber.email), request.url)
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.redirect(
      new URL('/unsubscribed?error=server', request.url)
    );
  }
}