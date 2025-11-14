"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import ModifyEvents from "@/components/pages/events/modifyEvents";
import { useState } from "react";

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
  const [sideScreenOpen, setSideScreenOpen] = useState<boolean>(false);
  const [editSideScreenOpen, setEditSideScreenOpen] = useState<boolean>(false);
  const [addSideScreenOpen, setAddSideScreenOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Event | null>(null);
  
  const handleCreateEvent = () => {
    setSideScreenOpen(true);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(true);
  };
  
  const handleEdit = (Event: Event) => {
    console.log('Edit Event:', Event);
    setSelectedItem(Event); 
    setSideScreenOpen(true);
    setEditSideScreenOpen(true);
    setAddSideScreenOpen(false);

  };

  const handleDelete = (Event: Event) => {
    console.log('Delete Event:', Event);
    if (confirm(`Are you sure you want to delete ${Event.title}?`)) {
      alert(`Deleted: ${Event.title}`);
    }
  };

  const closeAll = (): void => {
    setSideScreenOpen(false);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(false);
  };

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

  return(
    <>
      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeAll}
          />
          <div className="relative z-65">
            {addSideScreenOpen && <ModifyEvents onClose={closeAll} />}
            {editSideScreenOpen && (
              <ModifyEvents onClose={closeAll} row={selectedItem} />
            )}
          </div>
        </div>
      )}
      
      <PageHeader
        heading="Events"
        subHeading="Manage and track your events"
        buttonText="Create Event"
        onButtonClick={handleCreateEvent}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={EventData}
          onEdit={(Event) => handleEdit(Event)}
          onDelete={(Event) => handleDelete(Event)}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>


  )
}
