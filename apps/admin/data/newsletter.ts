import { TableColumn } from "@/components/common/DataTable";
import { FormField, NewsletterTableData } from "@seye-bamidele/shared-types";
import {formatDate } from "@seye-bamidele/ui";


export const columns: TableColumn<NewsletterTableData>[] = [
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

