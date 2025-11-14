"use client";

import { useState } from "react";
import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import ModifyArticle from "@/components/pages/articles/modifyArticle";


interface Article {
  id: number;
  date: string;
  title: string;
}

const ArticleData: Article[] = [
  {
    id: 1,
    title: "The best way to learn React",
    date: "26-05-2025",
  },
  {
    id: 2,
    title: "Understanding TypeScript basics",
    date: "23-05-2025",
  },
];

export default function ArticlesPage() {
  const [sideScreenOpen, setSideScreenOpen] = useState<boolean>(false);
  const [editSideScreenOpen, setEditSideScreenOpen] = useState<boolean>(false);
  const [addSideScreenOpen, setAddSideScreenOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Article | null>(null);


  const handleAddArticle = (): void => {
    setSideScreenOpen(true);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(true);
  };

  const handleEdit = (article: Article): void => {
    setSelectedItem(article);
    setSideScreenOpen(true);
    setEditSideScreenOpen(true);
    setAddSideScreenOpen(false);
  };

  const handleDelete = (article: Article): void => {
    console.log("Delete Article:", article);
    if (confirm(`Are you sure you want to delete "${article.title}"?`)) {
      alert(`Deleted: ${article.title}`);
    }
  };

  const closeAll = (): void => {
    setSideScreenOpen(false);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(false);
  };


  const columns: TableColumn<Article>[] = [
    {
      key: "date",
      header: "Date",
      sortable: false,
    },
    {
      key: "title",
      header: "Title",
      sortable: true,
    },
  ];

  return (
    <>
      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeAll}
          />
          <div className="relative z-65">
            {addSideScreenOpen && <ModifyArticle onClose={closeAll} />}
            {editSideScreenOpen && (
              <ModifyArticle onClose={closeAll} row={selectedItem} />
            )}
          </div>
        </div>
      )}

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
          onEdit={(article) => handleEdit(article)}
          onDelete={(article) => handleDelete(article)}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  );
}
