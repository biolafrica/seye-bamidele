import { formatDate } from "@/app/utils/common/formatDate";
import { TableColumn } from "@/components/common/DataTable";
import { FormField } from "@/components/common/Form";
import { Newsletter } from "@/types/newsletter";

export const NewsletterData: Newsletter[] = [
  { id: "1", subject: 'the best way to learn React', date: '26-05-2025' },
  { id: "2", subject: 'understanding TypeScript basics', date: '23-05-2025' },
];

export const columns: TableColumn<Newsletter>[] = [
  { key: 'created_at', header: 'Date', sortable: true, accessor:(row)=>formatDate(row.created_at ) },
  { key: 'subject', header: 'Subject', sortable: true }
];

export const newsletterFields:FormField[] = [
  { name: 'subject', label: 'Title', type: 'text', placeholder: 'Enter subject', required: true },
  { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter content', required: true },
  
 
 
];
