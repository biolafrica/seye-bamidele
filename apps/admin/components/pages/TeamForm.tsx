import Form, { FormField } from "../common/Form";

type Role = 'admin' | 'editor' | 'viewer'| '';

interface TeamFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export default function TeamForm({edit, initialValues}:{
  edit: boolean;
  initialValues: TeamFormData;
}) {

  const teamFields:FormField[] = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'enter your first name', required: true},
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'enter your last name', required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true},
    { name: 'role', label: 'Role', type: 'select',required: true,
      options: [
        { label: 'Select role', value: '' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
  ]

  const validateProfile = (values: TeamFormData) => {
    const errors: Partial<Record<keyof TeamFormData, string>> = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    return errors;
  };

  const handleEventSubmit = async (values: TeamFormData) => {
    edit ? console.log('Event updated:', values) :
    console.log('Event created:', values);
  };

  return (
    <div>
      <Form
        fields={teamFields}
        initialValues={initialValues}
        validate={validateProfile}
        onSubmit={handleEventSubmit}
        submitLabel={edit ? 'Update Member' : 'Add Member'}
      />
    </div>
  );
}