"use client"

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import TeamForm from "@/components/pages/TeamForm";
import { TeamData, columns } from "@/data/team";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Team } from "@/types/team";


export default function TeamPage() {  
  const sidePanel = useSidePanel<Team>();
  const { handleDelete } = useCrudHandlers<Team>();

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Team Member" : "Add New Team Member"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <TeamForm initialValues={{firstName: sidePanel.selectedItem.name.split(' ')[0], lastName: sidePanel.selectedItem.name.split(' ')[1] || "", email: sidePanel.selectedItem.email, role:""}} edit={true} />
        ) : (
          <TeamForm initialValues={{firstName: "", lastName:"", email: "", role:""}} edit={false} />
        )}
      </SidePanel>

      <PageHeader
        heading="Team"
        subHeading="Manage your team members"
        buttonText="Add Member"
        onButtonClick={sidePanel.openAdd}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={TeamData}
          onEdit={sidePanel.openEdit}
          onDelete={handleDelete}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  )
}