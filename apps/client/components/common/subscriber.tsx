"use client";

import { useState } from "react";
import { FormField, Subscribers } from "@seye-bamidele/shared-types";
import { Alert, Form,useSubscribers } from "@seye-bamidele/ui";


export default function Subscriber() {
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const {create} = useSubscribers();

  const initialValues = { email: "" };
  
  const handleSubmit = async(values:Subscribers) => {
    console.log("Subscriber email submitted:", values);
    try {
      await create(values);
      setShowSuccess("Thank you for subscribing!");
      setTimeout(() => {
        setShowSuccess("")
      }, 1500)

    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Error submitting, please try again.");
      console.error("Error submitting event form:", error);
    }
     
 
  }

  const validateSubscriber = (values:Subscribers) => {
    const errors: Partial<Record<keyof Subscribers, string>> = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    return errors;
  };

  const subscriberFields:FormField[] = [
    { name: 'email', label: '', type: 'email', placeholder: 'Email Address', required: false }
  ];

  return(
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

      <Form
        fields={subscriberFields}
        initialValues={initialValues}
        validate={validateSubscriber}
        onSubmit={handleSubmit}
        submitLabel="Join"
      />

    </>
  )
}