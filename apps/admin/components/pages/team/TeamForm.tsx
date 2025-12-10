"use client"

import { useState } from "react";
import { TeamFormData } from "@/types/team";
import { teamFields } from "@/data/team";
import { canUserPerform } from "@/app/utils/supabase/auth-utils";
import { useTeam } from "../../../../../packages/ui/src/hooks/useApi";
import { Alert, Form } from "@seye-bamidele/ui";

export default function TeamForm({edit, initialValues, id = "", onSuccess}:{
  edit: boolean;
  initialValues: TeamFormData;
  id?: string ;
  onSuccess?: (action: "created" | "updated") => void;
}) {
  const [errorMsg,   setErrorMsg]   = useState("");

  const {create, update} = useTeam();

  const validateProfile = (values: TeamFormData) => {
    const errors: Partial<Record<keyof TeamFormData, string>> = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!values.first_name) {
      errors.first_name= 'First name is required';
    }

    if (!values.last_name) {
      errors.last_name = 'Last name is required';
    }
    
    return errors;
  };

  const handleEventSubmit = async (values: TeamFormData) => {

    const canEdit = await canUserPerform('edit_user');
    if (!canEdit) {
      setErrorMsg('You do not have permission')
      return
    }

    try {
      if(edit){
        await update(id, values)
      }else{
        await create(values);
      }
      const action = edit ? "updated" : "created";
      onSuccess?.(action);

    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Error submitting, please try again.");
      console.error("Error submitting event form:", error);
    }
   
  };

  return (
    <>
      {errorMsg && (
        <Alert
          type="error"
          heading='Error'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}
  
      <div>
        <Form
          fields={teamFields}
          initialValues={initialValues}
          validate={validateProfile}
          onSubmit={handleEventSubmit}
          submitLabel={edit ? 'Update Member' : 'Add Member'}
        />
      </div>

    </>
  );
}