import { useState } from "react";
import { eventFields } from "@/data/event";
import { useEvents } from "../../../../../packages/ui/src/hooks/useApi";
import { Alert, Form } from "@seye-bamidele/ui";
import { EventFormData } from "@seye-bamidele/shared-types";


export default function EventForm({initialValues, edit, id = "", onSuccess }: {
  initialValues: EventFormData;
  edit: boolean;
  id?: string ;
  onSuccess?: (action: "created" | "updated") => void;
}) {
  const [errorMsg,   setErrorMsg]  = useState("");

  const {create, update} = useEvents();

  const validateEvent = (values: EventFormData ) => {
    const errors: Partial<Record<keyof EventFormData, string>> = {};

    if (values.event && values.event.length > 50) {
      errors.event = 'Event name must be less than 50 characters';
    }

    if (values.title && values.title.length > 60) {
      errors.title = 'Title must be less than 60 characters';
    }
    
    if (values.description && values.description.length > 200) {
      errors.description = 'description must be less than 200 characters';
    }
  
    if (!values.link) {
      errors.link = 'Link is required';
    } else if (!/^https?:\/\/\S+\.\S+/.test(values.link)) {
      errors.link = 'Link is invalid';
    }

    return errors;
  };

  const handleEventSubmit = async (values: EventFormData) => {
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
          fields={eventFields}
          initialValues={initialValues}
          validate={validateEvent}
          onSubmit={handleEventSubmit}
          submitLabel={edit ? "Update Event" : "Create Event"}
        /> 
      </div>

    </>

  )
}