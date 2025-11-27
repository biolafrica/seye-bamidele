import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import { supabaseAdmin } from "@/app/utils/supabase/supabaseAdmin";
import { TeamFormData } from "@/types/team";
import { NextRequest } from "next/server";

const { GET, PUT, DELETE } = createCRUDHandlers<TeamFormData>({
  table: "users",
  requiredFields: ["first_name", "last_name", "email", "role",],
});


export { GET, PUT, DELETE };

export async function POST(request: NextRequest){}


