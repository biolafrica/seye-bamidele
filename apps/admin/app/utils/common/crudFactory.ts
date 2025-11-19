import { NextRequest, NextResponse } from "next/server";
import { handleError, successResponse, validateRequired } from "@/app/utils/common/serverResponse";
import { supabaseAdmin } from "../supabase/supabaseAdmin";

export function createCRUDHandlers<T>({
  table,
  requiredFields = [],
}: {
  table: string;
  requiredFields?: string[];
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

        // Validate required fields
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

        const { error } = await supabaseAdmin
          .from(table)
          .delete()
          .eq("id", id);

        if (error) throw error;

        return successResponse({ message: `Deleted successfully` });
      } catch (error) {
        return handleError(error);
      }
    },
  };
}
