"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";


interface Newsletter {
  id: number;
  date: string;
  title: string;
}

const NewsletterData: Newsletter[] = [
  { id: 1, title: 'the best way to learn React', date: '26-05-2025' },
  { id: 2, title: 'understanding TypeScript basics', date: '23-05-2025' },
];

export default function SubscribersPage() {  
  const sidePanel = useSidePanel<Newsletter>();
  const { handleDelete } = useCrudHandlers<Newsletter>();

  const columns: TableColumn<Newsletter>[] = [
    { key: 'date', header: 'Date', sortable: false },
    { key: 'title', header: 'Title', sortable: true }
  ];

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Newsletter" : "Add New Newsletter"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <p className="text-gray-700">Editing: {sidePanel.selectedItem.title}</p>
        ) : (
          <p className="text-gray-700">Create a new newsletter</p>
        )}
      </SidePanel>
      
      <PageHeader
        heading="Subscribers"
        subHeading="Manage your newsletter subscribers"
        buttonText="Create Newsletter"
        onButtonClick={sidePanel.openAdd}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={NewsletterData}
          onEdit={sidePanel.openEdit}
          onDelete={handleDelete}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  )
}