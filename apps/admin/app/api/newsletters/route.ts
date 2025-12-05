import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { sendBulkEmail } from '@/app/utils/common/sendGrid';
import { createCRUDHandlers } from '@/app/utils/common/crudFactory';

export async function POST(request: NextRequest) {
  try {
    const { subject, content } = await request.json();

    // Validate input
    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // TODO: Add authentication check
    // const session = await getServerSession();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }


    // Fetch active subscribers from Supabase
    const { data: subscribers, error: fetchError } = await supabaseAdmin
    .from('subscribers')
    .select('email, name')
    .eq('is_active', true);

    if (fetchError) throw fetchError;

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 404 }
      );
    }

    // Send via SendGrid
    const result = await sendBulkEmail(subscribers, subject, content);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Save newsletter record to database
    await supabaseAdmin.from('newsletters').insert([
      {
        subject,
        content,
        total_sent: result.sent,
        // created_by: session.user.id, // Uncomment when auth is added
      },
    ]);

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${result.sent} subscribers`,
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