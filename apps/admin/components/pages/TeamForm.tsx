import { TeamFormData } from "@/types/team";
import Form from "../common/Form";
import { teamFields } from "@/data/team";
import { useTeam } from "@/hooks/useApi";

export default function TeamForm({edit, initialValues, id = "", onSuccess}:{
  edit: boolean;
  initialValues: TeamFormData;
  id?: string ;
  onSuccess?: () => void;
}) {

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
    try {
      if(edit){
        await update(id, values)
      }else{
        await create(values);
      }
      onSuccess?.();

    } catch (error) {
      console.error("Error submitting event form:", error);
    }
   
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