import { TableColumn } from "@/components/common/DataTable";
import { ArticleTableData, FormField } from "@seye-bamidele/shared-types";
import { formatDate } from "@seye-bamidele/ui";


export const columns: TableColumn<ArticleTableData>[] = [
  { key: "created_at", header: "Date", sortable: true, accessor:(row)=>formatDate(row.created_at )},
  { key: "title", header: "Title", sortable: true,}
];


export const articleFields:FormField[] = [
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter article title', required: true },
  { name: 'content', label: 'Content', type: 'textarea', placeholder:  `Start writing your newsletter content here...

  Use "##" for headings:
  ## My Heading

  Use "###" for subheadings:
  ## My Sub heading

  Use "**" for bold text:
  **My Sub heading**

  use "*" for italic text:
  *My Sub heading*

  use [title](url) for links:
  [paidHr](https://www.paidHr.com)

  Use triple backticks for code blocks:
  \`\`\`javascript
  const hello = "world";
  \`\`\`

  Use "1." for numbered lists:
  1. First item
  2. Second item

  Use "-" for bullet lists:
  - First point
  - Second point`, required: true },


  { name: 'excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Enter article excerpt', required: false },
  { name: 'image', label: 'Main Image', type: 'file', required: true, accept:'image/jpeg,image/png', aspectRatio: '4:3', helperText: 'Recommended size: 800x600px' },
  { name: 'image1', label: 'Image 1', type: 'file', required: false, accept:'image/jpeg,image/png', aspectRatio: '4:3',helperText: 'Recommended size: 800x600px' },
  { name: 'image2', label: 'Image 2', type: 'file', required: false, accept:'image/jpeg,image/png', aspectRatio: '4:3',helperText: 'Recommended size: 800x600px', },
]


