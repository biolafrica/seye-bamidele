import { useNewsletter } from "@/hooks/useApi";
import { NewsletterFormData } from "@/types/newsletter";
import { useState } from "react";
import Alert from "../common/alert";
import Form from "../common/Form";
import { newsletterFields } from "@/data/newsletter";

export default function NewsletterForm({initialValues, onSuccess }: {
  initialValues: NewsletterFormData;
  onSuccess?: (action: "created" | "updated") => void;
}) {
  const [errorMsg,   setErrorMsg]  = useState("");

  const {create} = useNewsletter();

  const validateEvent = (values: NewsletterFormData ) => {
    const errors: Partial<Record<keyof NewsletterFormData, string>> = {};
    
    if (values.subject && values.subject.length > 200) {
      errors.subject = 'description must be less than 200 characters';
    }

    return errors;
  };

  const handleEventSubmit = async (values: NewsletterFormData) => {
    try {
      const res =await create(values);
      console.log("Newsletter created:", res);
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