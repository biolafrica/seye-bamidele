import { supabaseAdmin } from "../supabase/supabaseAdmin";
import generateTempPassword from "./generateTempPassword";

import { sendEmail } from "./sendEmail";

export interface CreateInvitedUserParams { 
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export async function createInvitedUser({
  email,
  firstName,
  lastName,
  role,
}: CreateInvitedUserParams): Promise<{ success: boolean; userId: string }> {

  const tempPassword = generateTempPassword();

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      role: role,
    }
  });

  if (authError) throw authError;

  const userId = authData.user.id;

  const { error: dbError } = await supabaseAdmin.from("Users").insert({
    id: userId,
    email,
    first_name: firstName,
    last_name: lastName,
    role,
  });

  if (dbError) {
    await supabaseAdmin.auth.admin.deleteUser(userId);
    throw dbError;
  }

  await sendEmail({
    to: email,
    subject: "Your new account credentials",
    html: `
      <p>Hello ${firstName},</p>

      <p>Your account has been created.</p>

      <p><strong>Email:</strong> ${email}<br/>
      <strong>Temporary Password:</strong> ${tempPassword}</p>

      <p>Please sign in and change your password immediately.</p>

      <p>Welcome aboard!</p>
    `
  });

  return { success: true, userId };
}
