"use client"

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import EventForm from "@/components/pages/EventForm";
import { columns } from "@/data/event";
import { useEvents } from "@/hooks/useApi";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Event } from "@/types/events";
import { useEffect } from "react";


export default function EventsPage() {
  const sidePanel = useSidePanel<Event>();

  const {data, getAll, remove} = useEvents();

  useEffect(() => {getAll()}, []);

  const handleDelete = async (row:any) => {
    await remove(row.id);
  }

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Event" : "Create Event"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <EventForm initialValues={{ 
            event: `${sidePanel.selectedItem.event}`,
            title: `${sidePanel.selectedItem.title}`, 
            description:`${sidePanel.selectedItem.description}`,   
            link:`${sidePanel.selectedItem.link}`, 
            category:`${sidePanel.selectedItem.category}`, 
            type:`${sidePanel.selectedItem.type}`, 
          }} edit={true} id={sidePanel.selectedItem.id} />
        ) : (
          <EventForm
            initialValues={{ event: '', title: '', description: '', link: '', category: '', type: '' }}
            edit={false}
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
          data={data|| []}
          onEdit={sidePanel.openEdit}
          onDelete={handleDelete}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  )
}
