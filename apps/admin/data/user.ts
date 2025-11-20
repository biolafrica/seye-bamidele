import { FormField } from "@/components/common/Form";

export const loginFields:FormField[] = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true },
]