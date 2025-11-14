"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";

interface Event {
  id: number;
  date: string;
  title: string;
}

const EventData: Event[] = [
  {
    id: 1,
    title: 'the best way to learn React',
    date: '26-05-2025',
  },
  {
    id: 2,
    title: 'understanding TypeScript basics',
    date: '23-05-2025',
  },
];

export default function EventsPage() {
  const sidePanel = useSidePanel<Event>();
  const { handleDelete } = useCrudHandlers<Event>();

  const columns: TableColumn<Event>[] = [
    {
      key: 'date',
      header: 'Date',
      sortable: false,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
    }
  ];

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Event" : "Create Event"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <p className="text-gray-700">Editing: {sidePanel.selectedItem.title}</p>
        ) : (
          <p className="text-gray-700">Create a new event</p>
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
