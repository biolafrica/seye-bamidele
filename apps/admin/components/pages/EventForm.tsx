import { EventFormData } from "@/types/events";
import Form from "../common/Form";
import { eventFields } from "@/data/event";
import { useEvents } from "@/hooks/useApi";

export default function EventForm({initialValues, edit, id = "" }: {
  initialValues: EventFormData;
  edit: boolean;
  id?: string ;
}) {
  const {create, update} = useEvents();

  const validateEvent = (values: EventFormData ) => {
    const errors: Partial<Record<keyof EventFormData, string>> = {};
    
    if (values.description && values.description.length > 200) {
      errors.description = 'description must be less than 200 characters';
    }
    if (!values.title && values.title.length > 60) {
      errors.title = 'Title must be less than 60 characters';
    }
    if (!values.event && values.event.length > 50) {
      errors.event = 'Event name must be less than 50 characters';
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
      window.location.reload();

    } catch (error) {
      console.error("Error submitting event form:", error);
    }
      
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