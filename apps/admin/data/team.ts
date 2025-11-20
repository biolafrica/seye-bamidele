import { TableColumn } from "@/components/common/DataTable";
import { FormField } from "@/components/common/Form";
import { Team } from "@/types/team";

export const TeamData: Team[] = [
  { id: 1, name: 'Seye Bamidele', email: 'seye@paidHr.com',created_at: '26-05-2025' },
  { id: 2, name: 'Abiodun Biobaku', email: 'biolafrica@gmail.com', created_at: '06-06-2025' },
];

export const columns: TableColumn<Team>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'created_at', header: 'Date Registered', sortable: false },
];

export const profileFields: FormField[] = [
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

export const teamFields:FormField[] = [
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