import { supabaseAdmin } from '@/app/utils/supabase/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data: subscribers, error } = await supabaseAdmin
      .from('subscribers')
      .select('email, name')
      .eq('is_active', true);

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      subscribers,
      count: subscribers?.length || 0 
    });
  } catch (error: any) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

// Add new subscriber
export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .insert([{ email, name }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (error: any) {
    console.error('Error adding subscriber:', error);
    return NextResponse.json(
      { error: 'Failed to add subscriber' },
      { status: 500 }
    );
  }
}