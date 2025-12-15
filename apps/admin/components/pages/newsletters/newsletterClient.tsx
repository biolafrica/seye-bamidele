"use client";

import { useSidePanel } from "@/hooks/useSidePanel";
import {useState } from "react";
import { Alert, useNewsletter } from "@seye-bamidele/ui";
import SidePanel from "@/components/common/SidePanel";
import NewsletterDetails from "./NewsletterDetails";
import NewsletterForm from "./NewsletterForm";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { columns } from "@/data/newsletter";
import { NewsletterSidePanel } from "@seye-bamidele/shared-types";
import { newsletterEmptymessage } from "@/app/utils/common/emptyTableObjects";
import { useAdminTablePage } from "@/hooks/useAdminTablePage";

export default function NewsletterClient() {  
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const sidePanel = useSidePanel<NewsletterSidePanel>();
  const table = useAdminTablePage({ useSource: useNewsletter });

  const handleSuccess = async (action: "created" | "updated") => {
    await table.fetchData(); 
    sidePanel.close();
    setShowSuccess(`The newsletter has been ${action}.`);
    setTimeout(() => {
      setShowSuccess("")
    }, 1500)
  };

  return (
    <>
      {showSuccess && (
        <Alert
          type="success"
          heading="Successfully"
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

      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Newsletter" : "Create Newsletter"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <NewsletterDetails
          id={sidePanel.selectedItem.id} content={sidePanel.selectedItem.content}
          
            />
        ) : (
          <NewsletterForm
            initialValues={{ 
              subject: '',
              content: '',  
            }} 
            onSuccess={handleSuccess} 
          />
        )}
      </SidePanel>
      
      <PageHeader
        heading="Newsletters"
        subHeading="Manage your newsletter publications"
        buttonText="Create Newsletter"
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
          onMore={sidePanel.openEdit}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          emptyMessage={newsletterEmptymessage}
        />
      </div>
    </>
  )
}
