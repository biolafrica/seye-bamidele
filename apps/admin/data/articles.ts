import { formatDate } from "@/app/utils/common/formatDate";
import { TableColumn } from "@/components/common/DataTable";
import { FormField } from "@/components/common/Form";
import { Article} from "@/types/articles";


export const columns: TableColumn<Article>[] = [
  { key: "created_at", header: "Date", sortable: true, accessor:(row)=>formatDate(row.created_at )},
  { key: "title", header: "Title", sortable: true},
];


export const articleFields:FormField[] = [
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter article title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Enter article content', required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Enter article excerpt', required: false },
  { name: 'image', label: 'Main Image', type: 'file', required: true, accept:'image/jpeg,image/png', aspectRatio: '4:3', helperText: 'Recommended size: 800x600px' },
  { name: 'image1', label: 'Image 1', type: 'file', required: false, accept:'image/jpeg,image/png', aspectRatio: '4:3',helperText: 'Recommended size: 800x600px' },
  { name: 'image2', label: 'Image 2', type: 'file', required: false, accept:'image/jpeg,image/png', aspectRatio: '4:3',helperText: 'Recommended size: 800x600px', },
]


