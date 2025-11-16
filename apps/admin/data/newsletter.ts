import { TableColumn } from "@/components/common/DataTable";
import { Newsletter } from "@/types/newsletter";

export const NewsletterData: Newsletter[] = [
  { id: 1, title: 'the best way to learn React', date: '26-05-2025' },
  { id: 2, title: 'understanding TypeScript basics', date: '23-05-2025' },
];

export const columns: TableColumn<Newsletter>[] = [
  { key: 'date', header: 'Date', sortable: false },
  { key: 'title', header: 'Title', sortable: true }
];