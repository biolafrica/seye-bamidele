"use client";

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";

interface Article {
  id: number;
  date: string;
  title: string;
}

const ArticleData: Article[] = [
  {id: 1,title: "The best way to learn React", date: "26-05-2025"},
  { id: 2,title: "Understanding TypeScript basics", date: "23-05-2025"},
];

export default function ArticlesPage() {
  const sidePanel = useSidePanel<Article>();
  const { handleDelete } = useCrudHandlers<Article>();

  const columns: TableColumn<Article>[] = [
    { key: "date", header: "Date", sortable: false},
    { key: "title", header: "Title", sortable: true},
  ];

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Article" : "Add Article"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <p className="text-gray-700">Editing: {sidePanel.selectedItem.title}</p>
        ) : (
          <p className="text-gray-700">Create a new article</p>
        )}
      </SidePanel>

      <PageHeader
        heading="Articles"
        subHeading="Create and manage your articles"
        buttonText="Add Article"
        onButtonClick={sidePanel.openAdd}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={ArticleData}
          onEdit={sidePanel.openEdit}
          onDelete={handleDelete}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  );
}