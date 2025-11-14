"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import ModifySubscribers from "@/components/pages/subscribers/modifySubscribers";
import { useState } from "react";

interface Newsletter {
  id: number;
  date: string;
  title: string;
}

const NewsletterData: Newsletter[] = [
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

export default function SubscribersPage() {  
  const [sideScreenOpen, setSideScreenOpen] = useState<boolean>(false);
  const [editSideScreenOpen, setEditSideScreenOpen] = useState<boolean>(false);
  const [addSideScreenOpen, setAddSideScreenOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Newsletter | null>(null);
  
  const handleCreateNewsletter = () => {
    setSideScreenOpen(true);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(true);
  };
  
  const handleEdit = (Newsletter: Newsletter) => {
    console.log('Edit Newsletter:', Newsletter);
    setSelectedItem(Newsletter);
    setSideScreenOpen(true);
    setEditSideScreenOpen(true);
    setAddSideScreenOpen(false);

   
  };

  const handleDelete = (Newsletter: Newsletter) => {
    console.log('Delete Newsletter:', Newsletter);
    if (confirm(`Are you sure you want to delete ${Newsletter.title}?`)) {
      alert(`Deleted: ${Newsletter.title}`);
    }
  };

  const closeAll = (): void => {
    setSideScreenOpen(false);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(false);
  };

  const columns: TableColumn<Newsletter>[] = [
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
            {addSideScreenOpen && <ModifySubscribers onClose={closeAll} />}
            {editSideScreenOpen && (
              <ModifySubscribers onClose={closeAll} row={selectedItem} />
            )}
          </div>
        </div>
      )}
      
      <PageHeader
        heading="Subscribers"
        subHeading="Manage your newsletter subscribers"
        buttonText="Create Newsletter"
        onButtonClick={handleCreateNewsletter}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={NewsletterData}
          onEdit={(Newsletter) => handleEdit(Newsletter)}
          onDelete={(Newsletter) => handleDelete(Newsletter)}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>

    </>
  )
}