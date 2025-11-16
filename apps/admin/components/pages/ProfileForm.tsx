'use client';

import { TeamFormData } from "@/types/team";
import Form from "../common/Form";
import { profileFields } from "@/data/team";

export default function ProfileForm() {
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

  const handleProfileSubmit = async (values: TeamFormData) => {
    console.log('Login submitted:', values);
  };

  return (
    <div>
      <Form
        fields={profileFields}
        initialValues={{ firstName: '', lastName: '', email: '', role: '' }}
        validate={validateProfile}
        onSubmit={handleProfileSubmit}
        submitLabel= "Update Profile"
        className="xl:w-3/5"
      />
    </div>
  );
}