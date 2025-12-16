import { NextRequest } from 'next/server';
import { SupabaseQueryBuilder } from '@/app/utils/supabase/queryBuilder';
import { successResponse, handleError } from '@/app/utils/common/serverResponse';
import { createCRUDHandlers } from '@/app/utils/common/crudFactory';
import { sendEmail } from '@/app/utils/common/sendEmail';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  is_active: boolean;
}

const subscriberQuery = new SupabaseQueryBuilder<Subscriber>('subscribers');

const handlers = createCRUDHandlers<Subscriber>({
  table: 'subscribers',
  requiredFields: ['email'],
  searchFields: ['email', 'name'],

  hooks: {
    afterCreate: async (createdSubscriber) => {
      await sendEmail({
        to: createdSubscriber.email,
        subject: 'Subscription Successful 🎉',
        html: `
          <p>Hello${createdSubscriber.name ? ` ${createdSubscriber.name}` : ''},</p>

          <p>Thank you for subscribing to our newsletter!</p>

          <p>You’ll now receive updates, insights, and announcements directly in your inbox.</p>

          <p>If you did not subscribe or wish to stop receiving emails, you can unsubscribe at any time.</p>

          <p>Welcome aboard 🚀</p>
        `,
      });
    },
  },

  customHandlers: {
    GET: async (request: NextRequest) => {
      try {
        const { searchParams } = new URL(request.url);

        if (searchParams.get('active') === 'true') {
          const subscribers = await subscriberQuery.findByCondition('is_active', true);
          return successResponse({
            success: true,
            subscribers,
            count: subscribers.length,
          });
        }

        const result = await subscriberQuery.findPaginated({
          page: parseInt(searchParams.get('page') || '1'),
          limit: parseInt(searchParams.get('limit') || '10'),
          search: searchParams.get('search') || '',
          searchFields: ['email', 'name'],
        });

        return successResponse(result);
      } catch (error) {
        return handleError(error);
      }
    },
  },
});

export const { GET, POST, PUT, DELETE } = handlers;
