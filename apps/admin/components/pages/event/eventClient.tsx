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


export default function EventClient() {
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<EventData | null>(null);
  
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sidePanel = useSidePanel<EventSidePanel>();
  const { data, pagination, loading, getAll, remove } = useEvents();

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
        title="Delete Event"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this event'}"? This action cannot be undone.`}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
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
          emptyMessage={eventEmptymessage}

        />
      </div>

    </>

  ) 
}