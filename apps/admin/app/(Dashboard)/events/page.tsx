"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";

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
  const handleCreateEvent = () => {
    console.log("Creating event...");
  };
  
  const handleEdit = (Event: Event) => {
    console.log('Edit Event:', Event);

    alert(`Edit: ${Event.title}`);
  };

  const handleDelete = (Event: Event) => {
    console.log('Delete Event:', Event);
    if (confirm(`Are you sure you want to delete ${Event.title}?`)) {
      alert(`Deleted: ${Event.title}`);
    }
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
