import { TableColumn } from "@/components/common/DataTable";
import { FormField } from "@/components/common/Form";
import { Article } from "@/types/articles";

export const ArticleData: Article[] = [
  {id: 1,title: "The best way to learn React", date: "26-05-2025"},
  { id: 2,title: "Understanding TypeScript basics", date: "23-05-2025"},
];

export const columns: TableColumn<Article>[] = [
  { key: "date", header: "Date", sortable: false},
  { key: "title", header: "Title", sortable: true},
];


export const articleFields:FormField[] = [
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter article title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter article content', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Enter article excerpt', required: false },
]