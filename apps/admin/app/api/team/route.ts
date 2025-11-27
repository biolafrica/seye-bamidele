import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import generateTempPassword from "@/app/utils/common/generateTempPassword";
import { sendEmail } from "@/app/utils/common/sendEmail";
import { supabaseAdmin } from "@/app/utils/supabase/supabaseAdmin";
import { BackendUserData} from "@/types/team";

export const { GET, POST, PUT, DELETE } = createCRUDHandlers({
  table: "Users",
  requiredFields: ["email", "first_name", "last_name"],

  hooks: {
    beforeCreate: async (body:BackendUserData) => {
      const tempPassword = generateTempPassword();

      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          first_name: body.first_name,
          last_name: body.last_name,
          role: body.role,
        },
      });

      if (error) throw error;

      body.id = data.user.id;

      return { tempPassword, email: body.email };
    },

    afterCreate: async (createdUser, ctx:any) => {
      await sendEmail({
        to: createdUser.email,
        subject: "Your new account credentials",
        html: `
          <p>Hello ${createdUser.firstName},</p>

          <p>Your account has been created.</p>

          <p><strong>Email:</strong> ${createdUser.email}<br/>
          <strong>Temporary Password:</strong> ${ctx.tempPassword}</p>

          <p>Please sign in and change your password immediately.</p>

          <p>Welcome aboard!</p>
        `,
      });
    },

    beforeUpdate: async (id, body) => {
      await supabaseAdmin.auth.admin.updateUserById(id, {
        user_metadata: {
          first_name: body.first_name,
          last_name: body.last_name,
          role: body.role,
        },
      });
    },

    beforeDelete: async (id) => {
      await supabaseAdmin.auth.admin.deleteUser(id);
    },
  },
});


