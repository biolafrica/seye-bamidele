import { createCRUDHandlers } from '@/app/utils/common/crudFactory';
import { sendTrackedNewsletter } from '@/app/utils/common/sendGrid';
import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const { subject, content } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // Fetch active subscribers with all needed fields
    const { data: subscribers, error: fetchError } = await supabaseAdmin
      .from('subscribers')
      .select('id, email, name, unsubscribe_token')
      .eq('is_active', true);

    console.log('Active subscribers fetched:', subscribers?.length);
    console.log('subscribers:', subscribers);

    if (fetchError) throw fetchError;

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 404 }
      );
    }

    // Create newsletter record first to get the ID
    const { data: newsletter, error: newsletterError } = await supabaseAdmin
      .from('newsletters')
      .insert([
        {
          subject,
          content,
          total_sent: subscribers.length,
        },
      ])
      .select()
      .single();

    console.log('Newsletter record created:', newsletter);
    if (newsletterError) throw newsletterError;

    // Send emails with tracking
    const result = await sendTrackedNewsletter(
      subscribers,
      subject,
      content,
      newsletter.id
    );
    console.log('Newsletter send result:', result);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Record sent events for each subscriber
    const analyticsRecords = subscribers.map(sub => ({
      newsletter_id: newsletter.id,
      subscriber_id: sub.id,
      event_type: 'sent',
    }));

    console.log('Inserting analytics records:', analyticsRecords);

    await supabaseAdmin.from('email_analytics').insert(analyticsRecords);

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${result.sent} subscribers`,
      newsletterId: newsletter.id,
      sent: result.sent,
    });
    
  } catch (error: any) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}

const { GET, DELETE } = createCRUDHandlers<Event>({
  table: "newsletters",
  requiredFields: ["subject", "content"],
});

export { GET, DELETE };