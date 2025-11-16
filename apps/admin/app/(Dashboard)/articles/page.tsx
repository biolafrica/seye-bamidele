"use client";

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import ArticleForm from "@/components/pages/ArticleForm";
import { ArticleData, columns } from "@/data/articles";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Article } from "@/types/articles";


export default function ArticlesPage() {
  const sidePanel = useSidePanel<Article>();
  const { handleDelete } = useCrudHandlers<Article>();

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Article" : "Add Article"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <ArticleForm initialValues={{title: sidePanel.selectedItem.title, excerpt: "", content: ""}} edit={true} />
        ) : (
          <ArticleForm initialValues={{title:"", excerpt: "", content: ""}} edit={false}/>
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