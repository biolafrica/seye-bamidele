import { TeamFormData } from "@/types/team";
import Form from "../common/Form";
import { teamFields } from "@/data/team";

export default function TeamForm({edit, initialValues}:{
  edit: boolean;
  initialValues: TeamFormData;
}) {


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