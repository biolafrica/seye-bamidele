'use client'

import { useEffect, useState } from "react";
import { Alert, ConfirmBanner, useEvents } from "@seye-bamidele/ui";
import DataTable from "@/components/common/DataTable";
import { columns } from "@/data/event";
import PageHeader from "@/components/common/PageHeader";
import EventForm from "./EventForm";
import SidePanel from "@/components/common/SidePanel";
import { useSidePanel } from "@/hooks/useSidePanel";
import { EventData, EventSidePanel } from "@seye-bamidele/shared-types";
import { eventEmptymessage } from "@/app/utils/common/emptyTableObjects";
import { useAdminTablePage } from "@/hooks/useAdminTablePage";
import { useDeleteAction } from "@/hooks/useDeleteAction";


export default function EventClient() {
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const sidePanel = useSidePanel<EventSidePanel>();
  const table = useAdminTablePage({ useSource: useEvents });
  const deleteAction = useDeleteAction<EventData>({
    onDelete: async (item) => {
      await table.remove?.(item.id);
    },
    onSuccess: async () => {
      setShowSuccess("The event has been deleted.");
      await table.fetchData();
    },
    onError: () => {
      setErrorMsg("Failed to delete event.");
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
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteAction.itemToDelete?.title || 'this event'}"? This action cannot be undone.`}
        variant="danger"
        onConfirm={deleteAction.confirmDelete}
        onCancel={deleteAction.cancelDelete}
      />

      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Event" : "Create Event"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <EventForm 
            initialValues={{ 
              event: `${sidePanel.selectedItem.event}`,
              title: `${sidePanel.selectedItem.title}`, 
              description:`${sidePanel.selectedItem.description}`,   
              link:`${sidePanel.selectedItem.link}`, 
              category:`${sidePanel.selectedItem.category}`, 
              type:`${sidePanel.selectedItem.type}`, 
            }} 
            edit={true} 
            id={sidePanel.selectedItem.id} 
            onSuccess={handleSuccess} 
          />
        ) : (
          <EventForm
            initialValues={{ 
              event: '', 
              title: '', 
              description: '', 
              link: '', 
              category: '', 
              type: '' 
            }}
            edit={false}
            onSuccess={handleSuccess}
          />
        )}
      </SidePanel>
      
      <PageHeader
        heading="Events"
        subHeading="Manage and track your events"
        buttonText="Create Event"
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
          emptyMessage={eventEmptymessage}

        />
      </div>

    </>

  ) 
}