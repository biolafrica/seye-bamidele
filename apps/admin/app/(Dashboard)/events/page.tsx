"use client"

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import EventForm from "@/components/pages/EventForm";
import { columns } from "@/data/articles";
import { EventData } from "@/data/event";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Event } from "@/types/events";


export default function EventsPage() {
  const sidePanel = useSidePanel<Event>();
  const { handleDelete } = useCrudHandlers<Event>();

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Event" : "Create Event"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <EventForm initialValues={{ 
            event: 'event 1',
            title: sidePanel.selectedItem.title, 
            description: '', 
            link: '', 
            category: '', 
            type: '' 
          }} edit={true} />
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
          data={EventData}
          onEdit={sidePanel.openEdit}
          onDelete={handleDelete}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  )
}
