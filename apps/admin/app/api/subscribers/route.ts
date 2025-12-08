import { NextRequest } from 'next/server';
import { SupabaseQueryBuilder } from '@/app/utils/supabase/queryBuilder';
import { successResponse, handleError } from '@/app/utils/common/serverResponse';
import { createCRUDHandlers } from '@/app/utils/common/crudFactory';

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
  customHandlers: {
    GET: async (request: NextRequest) => {
      try {
        const { searchParams } = new URL(request.url);
        
        // If requesting active subscribers only
        if (searchParams.get('active') === 'true') {
          const subscribers = await subscriberQuery.findByCondition('is_active', true);
          return successResponse({
            success: true,
            subscribers,
            count: subscribers.length
          });
        }

        // Default pagination
        const result = await subscriberQuery.findPaginated({
          page: parseInt(searchParams.get("page") || "1"),
          limit: parseInt(searchParams.get("limit") || "10"),
          search: searchParams.get("search") || "",
          searchFields: ['email', 'name'],
        });

        return successResponse(result);
      } catch (error) {
        return handleError(error);
      }
    }
  }
});

export const { GET, POST, PUT, DELETE } = handlers;