"use client";

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import ArticleForm from "@/components/pages/ArticleForm";
import { columns } from "@/data/articles";
import { useArticles } from "@/hooks/useApi";
import { useSidePanel } from "@/hooks/useSidePanel";
import { useEffect } from "react";


export default function ArticlesPage() {
  const sidePanel = useSidePanel<any>();
  const {data, getAll, remove} = useArticles();

  useEffect(() => {getAll()}, []);

  const handleDelete = async (row:any) => {

    try {
      await remove(row.id);
    } catch (error) {
      console.error("Error deleting article:", error);
    }

  }

  const handleSuccess = async () => {
    await getAll(); 
    sidePanel.close();
  };


  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Article" : "Add Article"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <ArticleForm initialValues={{
            title: sidePanel.selectedItem.title,
            excerpt: sidePanel.selectedItem.excerpt, 
            content: sidePanel.selectedItem.content, 
            image: sidePanel.selectedItem.image, 
            image1: sidePanel.selectedItem.images[1],
            image2: sidePanel.selectedItem.images[2],
          }} edit={true} article={sidePanel.selectedItem} onSuccess={handleSuccess} />
        ) : (
          <ArticleForm initialValues={{title:"", excerpt: "", content: "",image:'', image1:'', image2:''}} edit={false} article={null} onSuccess={handleSuccess}/>
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
          onDelete={handleDelete}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  );
}