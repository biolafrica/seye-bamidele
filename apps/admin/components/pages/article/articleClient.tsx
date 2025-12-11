"use client"

import { useEffect, useState } from "react";
import SidePanel from "@/components/common/SidePanel";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { columns } from "@/data/articles";
import ArticleForm from "./ArticleForm";
import { Alert, ConfirmBanner, useArticles } from "@seye-bamidele/ui";
import { useSidePanel } from "@/hooks/useSidePanel";


export default function ArticleClient() {
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sidePanel = useSidePanel<any>();
  const { data, pagination, loading, getAll, remove } = useArticles();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page?: number, limit?: number) => {
    const params: Record<string, string> = {
      page: (page || pagination.page).toString(),
      limit: (limit || pagination.limit).toString(),
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    
    await getAll(params);
  };

  const handlePageChange = (page: number) => {
    fetchData(page, pagination.limit);
  };

  const handleItemsPerPageChange = (limit: number) => {
    fetchData(1, limit); 
  };

  const handleSort = (key: string, direction: 'asc' | 'desc' | null) => {
    if (direction === null) {
      setSortBy('created_at');
      setSortOrder('desc');
    } else {
      setSortBy(key);
      setSortOrder(direction);
    }
    
    
    const params: Record<string, string> = {
      page: '1',
      limit: pagination.limit.toString(),
      sortBy: direction ? key : 'created_at',
      sortOrder: direction || 'desc',
    };
    
    getAll(params);
  };

  const handleDeleteClick = (row: any) => {
    setItemToDelete(row);
    setShowDialog(true);
  }

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await remove(itemToDelete.id);
      setShowSuccess("The event has been deleted.")
      setShowDialog(false);
      setItemToDelete(null);
      setTimeout(() => {
        setShowSuccess("")
      }, 1500)
    } catch (error) {
      setErrorMsg("Failed to delete event.");
      console.error("Error deleting event:", error);
      setShowDialog(false);
      setItemToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setShowDialog(false);
    setItemToDelete(null);
  }

  const handleSuccess = async (action: "created" | "updated") => {
    await fetchData(); 
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
          pagination={pagination}
          loading={loading}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSort={handleSort}
          onEdit={sidePanel.openEdit}
          onDelete={handleDeleteClick}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>

    </>
  )
}