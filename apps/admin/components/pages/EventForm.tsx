import { EventFormData } from "@/types/events";
import Form from "../common/Form";
import { eventFields } from "@/data/event";

export default function EventForm({initialValues, edit }: {
  initialValues: EventFormData;
  edit: boolean;
}) {

  const validateEvent = (values: EventFormData ) => {
    const errors: Partial<Record<keyof EventFormData, string>> = {};
    
    if (values.description && values.description.length > 200) {
      errors.description = 'Bio must be less than 500 characters';
    }

    if (!values.link) {
      errors.link = 'Link is required';
    } else if (!/^https?:\/\/\S+\.\S+/.test(values.link)) {
      errors.link = 'Link is invalid';
    }

    return errors;
  };

  const handleEventSubmit = async (values: EventFormData) => {
    edit ? console.log('Event updated:', values) :
    console.log('Event created:', values);
  };
  
  return (
    <div>
      <Form
        fields={eventFields}
        initialValues={initialValues}
        validate={validateEvent}
        onSubmit={handleEventSubmit}
        submitLabel={edit ? "Update Event" : "Create Event"}
      /> 
    </div>

  )
}