"use client";

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import Alert from "@/components/common/alert";
import ConfirmBanner from "@/components/common/confirmBanner";
import ArticleForm from "@/components/pages/ArticleForm";
import { columns } from "@/data/articles";
import { useArticles } from "@/hooks/useApi";
import { useSidePanel } from "@/hooks/useSidePanel";
import { useEffect, useState } from "react";


export default function ArticlesPage() {
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const sidePanel = useSidePanel<any>();
  const {data, getAll, remove} = useArticles();

  useEffect(() => { getAll() }, []);

  const handleDeleteClick = (row: any) => {
    setItemToDelete(row);
    setShowDialog(true);
  }

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await remove(itemToDelete.id);
      setShowSuccess("The article has been deleted.")
      setShowDialog(false);
      setItemToDelete(null);
      setTimeout(() => {
        setShowSuccess("")
      }, 1500)
    } catch (error) {
      setErrorMsg("Failed to delete article.");
      console.error("Error deleting article:", error);
      setShowDialog(false);
      setItemToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setShowDialog(false);
    setItemToDelete(null);
  }

  const handleSuccess = async () => {
    await getAll(); 
    sidePanel.close();
    setShowSuccess("The user has been deleted.");
    setTimeout(() => {
      setShowSuccess("")
    }, 1500)
  };


  return (
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
        open={showDialog}
        title="Delete Article"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this article'}"? This action cannot be undone.`}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
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
              image1: sidePanel.selectedItem.image?.[1] ?? null,
              image2: sidePanel.selectedItem.image?.[2] ?? null
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
          data={data || []}
          onEdit={sidePanel.openEdit}
          onDelete={handleDeleteClick}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>

    </>
  );
}