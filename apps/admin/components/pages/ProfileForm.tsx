'use client';

import Form, { FormField } from "../common/Form";

type Role = 'admin' | 'editor' | 'viewer'| '';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export default function ProfileForm() {

  const profileFields: FormField[] = [
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
  ];

  const validateProfile = (values: ProfileFormData) => {
    const errors: Partial<Record<keyof ProfileFormData, string>> = {};
    
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

  const handleProfileSubmit = async (values: ProfileFormData) => {
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