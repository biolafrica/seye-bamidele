import { NextRequest, NextResponse } from "next/server";
import { handleError, successResponse, validateRequired } from "@/app/utils/common/serverResponse";
import { supabaseAdmin } from "../supabase/supabaseAdmin";

export function createCRUDHandlers<T>({
  table,
  requiredFields = [],
  hooks = {}
}: {
  table: string;
  requiredFields?: string[];
  hooks?: {
    beforeCreate?: (body: T) => Promise<any>;
    afterCreate?: (created: any, body: T, ctx?: any) => Promise<any>;
    beforeUpdate?: (id: string, body: Partial<T>) => Promise<any>;
    afterUpdate?: (updated: any, body: Partial<T>) => Promise<any>;
    beforeDelete?: (id: string) => Promise<any>;
    afterDelete?: (id: string) => Promise<any>;
  };
}) {
  
  return {

    GET: async (request: NextRequest) => {
      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        let query = supabaseAdmin.from(table).select("*");

        if (id) {
          const { data, error } = await query.eq("id", id).single();
          if (error) throw error;
          return successResponse(data);
        }

        const { data, error } = await query.order("created_at", {
          ascending: false,
        });

        if (error) throw error;
        return successResponse(data);
      } catch (error) {
        return handleError(error);
      }
    },

    POST: async (request: NextRequest) => {
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

        const { data, error } = await supabaseAdmin
        .from(table)
        .insert([body])
        .select()
        .single();

        if (error) throw error;

        if (hooks.afterCreate) {
          await hooks.afterCreate(data, body, ctx);
        }

        return successResponse(data, 201);
      } catch (error) {
        return handleError(error);
      }
    },

    PUT: async (request: NextRequest) => {
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

        const updateData = {
          ...body,
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabaseAdmin
          .from(table)
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;

        if (hooks.afterUpdate) {
          await hooks.afterUpdate(data, body);
        }

        return successResponse(data);
      } catch (error) {
        return handleError(error);
      }
    },

    DELETE: async (request: NextRequest) => {
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

        const { error } = await supabaseAdmin
          .from(table)
          .delete()
          .eq("id", id);

        if (error) throw error;

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

