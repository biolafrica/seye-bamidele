"use client"

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import { columns } from "@/data/articles";
import { NewsletterData } from "@/data/newsletter";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Newsletter } from "@/types/newsletter";

export default function NewsletterPage() {  
  const sidePanel = useSidePanel<Newsletter>();
  const { handleDelete } = useCrudHandlers<Newsletter>();

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
        heading="Newsletters"
        subHeading="Manage your newsletter publications"
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