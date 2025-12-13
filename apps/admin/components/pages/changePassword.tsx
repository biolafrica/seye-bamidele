'use client'

import { createClient } from "@/app/utils/supabase/client";
import Form, { FormField } from "../common/Form";
import { useState } from "react";
import Alert from "../common/alert";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordPage() {

  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const changePasswordFields:FormField[] = [
    {
      name: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter your current password',
      required: true,
      autoComplete: 'current-password',
    },
    {
      name: 'newPassword',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter your new password',
      required: true,
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm new your password',
      required: true,
      autoComplete: 'new-password',
    },
    
  ];

  const validateChangePassword = (values: ChangePasswordFormData) => {
    const errors: Partial<Record<keyof ChangePasswordFormData, string>> = {};
    
    if (!values.currentPassword) {
      errors.currentPassword = 'Password is required';
    } else if (values.currentPassword.length < 8) {
      errors.currentPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.currentPassword)) {
      errors.currentPassword = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!values.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (values.newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.newPassword)) {
      errors.newPassword = 'New password must contain uppercase, lowercase, and numbers';
    }

    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleChangePasswordSubmit = async (values: ChangePasswordFormData) => {
    const supabase = createClient();

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user?.email) {
        return setErrorMsg("Unable to retrieve user information.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: values.currentPassword,

      });

      if (signInError) {
        return  setErrorMsg("Current password is incorrect");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: values.newPassword
      });

      if (updateError) {
        return setErrorMsg(updateError instanceof Error ? updateError.message : "Error updating, please try again.")
      }

      setShowSuccess("Password changed successfully.")
      
    } catch (error) {
      console.error("Unexpected error changing password:", error);
      setErrorMsg(error instanceof Error ? error.message : "Unexpected error changing password.")
    }
    
  };


  return (
    <>
      {showSuccess && (
        <Alert
          type="success"
          heading="successfully"
          subheading={showSuccess}
          duration={2000}
          onClose={() => setShowSuccess("")}
        />
      )}

      {errorMsg && (
        <Alert
          type="error"
          heading='Error'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}

      <main className="bg-card p-6 rounded-lg border border-border">
        <h1 className="text-xl font-semibold text-heading mb-6">Change Password</h1>
        <Form
            fields={changePasswordFields}
            initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
            validate={validateChangePassword}
            onSubmit={handleChangePasswordSubmit}
            submitLabel= "Change Password"
            className="xl:w-3/5"
          />
      </main>
    </>
  )
}
