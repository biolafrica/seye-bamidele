'use client';

import { loginFields } from "@/data/user";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Form } from "@seye-bamidele/ui";
import { TeamUser } from "@seye-bamidele/shared-types";


export default function LoginForm() {
  const router = useRouter();

  const validateEvent = (values: TeamUser) => {
    const errors: Partial<Record<keyof TeamUser, string>> = {};

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    return errors;
  };

  const handleEventSubmit = async (values: TeamUser) => {
    const supabase = createClient();

    try {
      const {error} = await supabase.auth.signInWithPassword({
        email:values.email, 
        password:values.password
      });

      if (error) {
        throw error;
      }

      router.push('/')
      
    } catch (error) {
      console.error("Error submitting login form:", error);
      
    }   
  };

  return(
    <>
      <Form
        fields={loginFields}
        initialValues={{ email: '', password: '' }}
        validate={validateEvent}
        onSubmit={handleEventSubmit}
        submitLabel={"Login"}
      />
    </>
    
  )

}
