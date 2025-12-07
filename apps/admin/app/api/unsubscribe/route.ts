import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Invalid unsubscribe link' },
      { status: 400 }
    );
  }

  try {
    // Find subscriber by token
    const { data: subscriber, error } = await supabaseAdmin
      .from('subscribers')
      .select('email, is_active')
      .eq('unsubscribe_token', token)
      .single();

    if (error || !subscriber) {
      console.error('Subscriber not found:', error);
      return NextResponse.redirect(
        new URL('/unsubscribed?error=not_found', request.url)
      );
    }

    // Check if already unsubscribed
    if (!subscriber.is_active) {
      return NextResponse.redirect(
        new URL('/unsubscribed?email=' + encodeURIComponent(subscriber.email) + '&already=true', request.url)
      );
    }

    // Update subscriber status to inactive
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

    // Redirect to unsubscribe confirmation page
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