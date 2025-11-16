import Form, { FormField } from "../common/Form";

type Category = 'conference' | 'show' | 'podcast' | '';
type Type = 'audio' | 'video' | 'article' | '';

interface EventFormData {
  event: string;
  title: string;
  description: string;
  link: string;
  category: Category;
  type: Type;
}

export default function EventForm({initialValues, edit }: {
  initialValues: EventFormData;
  edit: boolean;
}) {

  const eventFields:FormField[] = [
    { name: 'event', label: 'Event Name', type: 'text', placeholder: 'Enter event name', required: true },
    { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description', required: true },
    { name: 'link', label: 'Link', type: 'url', placeholder: 'https://example.com', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true,
      options: [
        { label: 'Select category', value: '' },
        { label: 'Conference', value: 'conference' },
        { label: 'Show', value: 'show' },
        { label: 'Podcast', value: 'podcast' },
      ],
    },
    { name: 'type', label: 'Type', type: 'select', required: true,
      options: [
        { label: 'Select type', value: '' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Article', value: 'article' },
      ],
    },
  ];

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