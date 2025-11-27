import { formatDate } from "@/app/utils/common/formatDate";
import { TableColumn } from "@/components/common/DataTable";
import { FormField } from "@/components/common/Form";
import { Team } from "@/types/team";


export const columns: TableColumn<Team>[] = [
  { key: 'first_name', header: 'First Name', sortable: false },
  { key: 'last_name', header: 'Last Name', sortable: false },
  { key: 'email', header: 'Email', sortable: false },
  {key: "role", header: "Role", sortable: false},
  { key: 'created_at', header: 'Date Registered', sortable: false, accessor:(row)=>formatDate(row.created_at )},
];

export const profileFields: FormField[] = [
  { name: 'first_name', label: 'First Name', type: 'text', placeholder: 'enter your first name', required: true},
  { name: 'last_name', label: 'Last Name', type: 'text', placeholder: 'enter your last name', required: true },
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
  { name: 'first_name', label: 'First Name', type: 'text', placeholder: 'enter your first name', required: true},
  { name: 'last_name', label: 'Last Name', type: 'text', placeholder: 'enter your last name', required: true },
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