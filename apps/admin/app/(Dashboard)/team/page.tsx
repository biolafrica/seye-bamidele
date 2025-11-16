"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import TeamForm from "@/components/pages/TeamForm";
import { useCrudHandlers } from "@/hooks/useCrudHandler";
import { useSidePanel } from "@/hooks/useSidePanel";

interface Team {
  id: number;
  name: string;
  email: string;
  dateRegistered: string;
}

const TeamData: Team[] = [
  { id: 1, name: 'Seye Bamidele', email: 'seye@paidHr.com', dateRegistered: '26-05-2025' },
  { id: 2, name: 'Abiodun Biobaku', email: 'biolafrica@gmail.com', dateRegistered: '06-06-2025' },
];

export default function TeamPage() {  
  const sidePanel = useSidePanel<Team>();
  const { handleDelete } = useCrudHandlers<Team>();

  const columns: TableColumn<Team>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'dateRegistered', header: 'Date Registered', sortable: false },
  ];

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