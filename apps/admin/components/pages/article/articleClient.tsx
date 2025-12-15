"use client"

import {useState } from "react";
import SidePanel from "@/components/common/SidePanel";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { columns } from "@/data/articles";
import ArticleForm from "./ArticleForm";
import { Alert, ConfirmBanner, useArticles } from "@seye-bamidele/ui";
import { useSidePanel } from "@/hooks/useSidePanel";
import { ArticleData, ArticleSidePanel } from "@seye-bamidele/shared-types";
import { articleEmptymessage } from "@/app/utils/common/emptyTableObjects";
import { useAdminTablePage } from "@/hooks/useAdminTablePage";
import { useDeleteAction } from "@/hooks/useDeleteAction";


export default function ArticleClient() {
  const [showSuccess, setShowSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const sidePanel = useSidePanel<ArticleSidePanel>();
  
  const table = useAdminTablePage({ useSource: useArticles });

  const deleteAction = useDeleteAction<ArticleData>({
    onDelete: async (item) => {
      await table.remove?.(item.id);
    },
    onSuccess: async () => {
      setShowSuccess("The article has been deleted.");
      await table.fetchData();
    },
    onError: () => {
      setErrorMsg("Failed to delete article.");
    },
  });

  const handleSuccess = async (action: "created" | "updated") => {
    await table.fetchData(); 
    sidePanel.close();
    setShowSuccess(`The event has been ${action}.`);
    setTimeout(() => {
      setShowSuccess("")
    }, 1500)
  };

  return(
    <>
      {showSuccess && (
        <Alert
          type="success"
          heading="successfully"
          subheading={showSuccess}
          duration={2000}
          onClose={() => setShowSuccess("")}
        />
      )}

      {errorMsg && (
        <Alert
          type="error"
          heading='Error'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}

      <ConfirmBanner
        open={deleteAction.showDialog}
        title="Delete Article"
        message={`Are you sure you want to delete "${deleteAction.itemToDelete?.title || 'this article'}"? This action cannot be undone.`}
        variant="danger"
        onConfirm={deleteAction.confirmDelete}
        onCancel={deleteAction.cancelDelete}
      />

      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Article" : "Add Article"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <ArticleForm 
            initialValues={{
              title: sidePanel.selectedItem.title,
              excerpt: sidePanel.selectedItem.excerpt, 
              content: sidePanel.selectedItem.content, 
              image: sidePanel.selectedItem.image, 
              image1: sidePanel.selectedItem.images?.[1] ?? null,
              image2: sidePanel.selectedItem.images?.[2] ?? null
            }} 
            edit={true} 
            article={sidePanel.selectedItem} 
            onSuccess={handleSuccess} 
          />
        ) : (
          <ArticleForm 
            initialValues={{
              title:"", 
              excerpt: "", 
              content: "",
              image:'', 
              image1:'', 
              image2:''
            }} 
            edit={false} 
            article={null} 
            onSuccess={handleSuccess}
          />
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
          data={table.data || []}
          pagination={table.pagination}
          loading={table.loading}
          onPageChange={table.handlePageChange}
          onItemsPerPageChange={table.handleItemsPerPageChange}
          onSort={table.handleSort}
          onEdit={sidePanel.openEdit}
          onDelete={deleteAction.requestDelete}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          emptyMessage={articleEmptymessage}
        />
      </div>

    </>
  )
}