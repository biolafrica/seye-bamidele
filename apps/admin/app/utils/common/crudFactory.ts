import { NextRequest, NextResponse } from "next/server";
import { handleError, successResponse, validateRequired } from "@/app/utils/common/serverResponse";
import { SupabaseQueryBuilder } from "../supabase/queryBuilder";
import { getCacheHeaders } from "@seye-bamidele/config";

export function createCRUDHandlers<T>({
  table,
  requiredFields = [],
  searchFields = ['title', 'description'],
  hooks = {},
  customHandlers = {}
}: {
  table: string;
  requiredFields?: string[];
  searchFields?: string[];
  hooks?: {
    beforeCreate?: (body: T) => Promise<any>;
    afterCreate?: (created: any, body: T, ctx?: any) => Promise<any>;
    beforeUpdate?: (id: string, body: Partial<T>) => Promise<any>;
    afterUpdate?: (updated: any, body: Partial<T>) => Promise<any>;
    beforeDelete?: (id: string) => Promise<any>;
    afterDelete?: (id: string) => Promise<any>;
  };
  customHandlers?: {
    GET?: (request: NextRequest, queryBuilder: SupabaseQueryBuilder<T>) => Promise<NextResponse>;
    POST?: (request: NextRequest, queryBuilder: SupabaseQueryBuilder<T>) => Promise<NextResponse>;
    PUT?: (request: NextRequest, queryBuilder: SupabaseQueryBuilder<T>) => Promise<NextResponse>;
    DELETE?: (request: NextRequest, queryBuilder: SupabaseQueryBuilder<T>) => Promise<NextResponse>;
  };
}) {
  const queryBuilder = new SupabaseQueryBuilder<T>(table);

  return {
    GET: async (request: NextRequest) => {
      if (customHandlers.GET) {
        return customHandlers.GET(request, queryBuilder);
      }

      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
          const data = await queryBuilder.findById(id);
          return successResponse(data, 200, {
            headers: getCacheHeaders('apiMedium'),
          });
        }

        const result = await queryBuilder.findPaginated({
          page: parseInt(searchParams.get("page") || "1"),
          limit: parseInt(searchParams.get("limit") || "10"),
          search: searchParams.get("search") || "",
          searchFields,
          sortBy: searchParams.get("sortBy") || "created_at",
          sortOrder: (searchParams.get("sortOrder") as 'asc' | 'desc') || "desc",
        });

        return successResponse(result, 200, {
          headers: getCacheHeaders('apiMedium'),
        });
    
      } catch (error) {
        return handleError(error);
      }
    },

    POST: async (request: NextRequest) => {
      if (customHandlers.POST) {
        return customHandlers.POST(request, queryBuilder);
      }

      try {
        const body: T = await request.json();

        const ctx = hooks.beforeCreate ? await hooks.beforeCreate(body) : null;

        if (requiredFields.length > 0) {
          const validation = validateRequired(body, requiredFields);
          if (!validation.isValid) {
            return NextResponse.json(
              { error: validation.error },
              { status: 400 }
            );
          }
        }

        const data = await queryBuilder.create(body);

        if (hooks.afterCreate) {
          await hooks.afterCreate(data, body, ctx);
        }

        return successResponse(data, 201);
      } catch (error) {
        return handleError(error);
      }
    },

    PUT: async (request: NextRequest) => {
      if (customHandlers.PUT) {
        return customHandlers.PUT(request, queryBuilder);
      }

      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
          return NextResponse.json(
            { error: `ID is required` },
            { status: 400 }
          );
        }

        const body: Partial<T> = await request.json();

        if (hooks.beforeUpdate) {
          await hooks.beforeUpdate(id, body);
        }

        const data = await queryBuilder.update(id, body);

        if (hooks.afterUpdate) {
          await hooks.afterUpdate(data, body);
        }

        return successResponse(data);
      } catch (error) {
        return handleError(error);
      }
    },

    DELETE: async (request: NextRequest) => {
      if (customHandlers.DELETE) {
        return customHandlers.DELETE(request, queryBuilder);
      }

      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
          return NextResponse.json(
            { error: `ID is required` },
            { status: 400 }
          );
        }

        if (hooks.beforeDelete) {
          await hooks.beforeDelete(id);
        }

        await queryBuilder.delete(id);

        if (hooks.afterDelete) {
          await hooks.afterDelete(id);
        }

        return successResponse({ message: `Deleted successfully` });
      } catch (error) {
        return handleError(error);
      }
    },
  };
}

