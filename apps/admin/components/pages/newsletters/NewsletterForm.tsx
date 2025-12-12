import { useState } from "react";
import { newsletterFields } from "@/data/newsletter";
import { useNewsletter } from "../../../../../packages/ui/src/hooks/useApi";
import { Alert, Form } from "@seye-bamidele/ui";
import { NewsletterFormData } from "@seye-bamidele/shared-types";

export default function NewsletterForm({initialValues, onSuccess }: {
  initialValues: NewsletterFormData;
  onSuccess?: (action: "created" | "updated") => void;
}) {
  const [errorMsg,   setErrorMsg]  = useState("");

  const {create} = useNewsletter();

  const validateEvent = (values: NewsletterFormData ) => {
    const errors: Partial<Record<keyof NewsletterFormData, string>> = {};
    
    if (values.subject && values.subject.length > 100) {
      errors.subject = 'description must be less than 100 characters';
    }

    return errors;
  };

  const handleEventSubmit = async (values: NewsletterFormData) => {
    try {
      await create(values);
      const action = "created";
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
          fields={newsletterFields}
          initialValues={initialValues}
          validate={validateEvent}
          onSubmit={handleEventSubmit}
          submitLabel="Create Newsletter"
        /> 
      </div>

    </>
  );
}