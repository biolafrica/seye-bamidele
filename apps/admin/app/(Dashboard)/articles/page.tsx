"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";

interface Article {
  id: number;
  date: string;
  title: string;
}

const ArticleData: Article[] = [
  {
    id: 1,
    title: 'the best way to learn React',
    date: '26-05-2025',
  },
  {
    id: 2,
    title: 'understanding TypeScript basics',
    date: '23-05-2025',
  },
];


export default function ArticlesPage() {    
  const handleAddArticle = () => {
    console.log("Creating article...");
  };

  const handleEdit = (Article: Article) => {
    console.log('Edit Article:', Article);

    alert(`Edit: ${Article.title}`);
  };

  const handleDelete = (Article: Article) => {
    console.log('Delete Article:', Article);
    if (confirm(`Are you sure you want to delete ${Article.title}?`)) {
      alert(`Deleted: ${Article.title}`);
    }
  };

  const columns: TableColumn<Article>[] = [
    {
      key: 'date',
      header: 'Date',
      sortable: false,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
    }
  ];


  return (
    <>
      <PageHeader
        heading="Articles"
        subHeading="Create and manage your articles"
        buttonText="Add Article"
        onButtonClick={handleAddArticle}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={ArticleData}
          onEdit={(Article) => handleEdit(Article)}
          onDelete={(Article) => handleDelete(Article)}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  )
}