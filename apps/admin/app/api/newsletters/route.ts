import { NextRequest, NextResponse } from 'next/server';
import { handleError, successResponse } from '@/app/utils/common/serverResponse';
import { createCRUDHandlers } from '@/app/utils/common/crudFactory';
import { newsletterService } from '@/app/utils/services/newsletterServices';

interface Newsletter {
  id: string;
  subject: string;
  content: string;
  total_sent: number;
  total_opened: number;
  total_clicked: number;
  total_unsubscribed: number;
  created_at: string;
  sent_at?: string;
}


const handlers = createCRUDHandlers<Newsletter>({
  table: 'newsletters',
  requiredFields: ['subject', 'content'],
  searchFields: ['subject'],
});


export async function POST(request: NextRequest) {
  try {
    const { subject, content } = await request.json();

    const result = await newsletterService.sendNewsletter(subject, content);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error === 'No active subscribers found' ? 404 : 500 }
      );
    }

    return successResponse(
      {
        success: true,
        message: result.message,
        newsletterId: result.newsletterId,
        sent: result.sent,
      },
      201
    );
  } catch (error) {
    return handleError(error);
  }
}

export const { GET, DELETE } = handlers;