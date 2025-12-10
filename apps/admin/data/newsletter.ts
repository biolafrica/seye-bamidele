import { TableColumn } from "@/components/common/DataTable";
import { Newsletter } from "@/types/newsletter";
import { FormField, formatDate } from "@seye-bamidele/ui";

export const NewsletterData: Newsletter[] = [
  { id: "1", subject: 'the best way to learn React', date: '26-05-2025' },
  { id: "2", subject: 'understanding TypeScript basics', date: '23-05-2025' },
];

export const columns: TableColumn<Newsletter>[] = [
  { key: 'created_at', header: 'Date', sortable: true, accessor:(row)=>formatDate(row.created_at ) },
  { key: 'subject', header: 'Subject', sortable: true }
];


export const newsletterFields: FormField[] = [
  { 
    name: 'subject', 
    label: 'Title', 
    type: 'text', 
    placeholder: 'Enter the email subject...', 
    required: true ,
    helperText: 'Max 200 characters'
  },
  {
    name: 'content',
    label: 'Newsletter Content',
    type: 'richtext',
    required: true,
    helperText: 'Use the toolbar to format your content with headings, lists, links, and more',
  },
];

