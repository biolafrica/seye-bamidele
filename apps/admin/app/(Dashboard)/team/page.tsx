"use client"

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import TeamForm from "@/components/pages/TeamForm";
import {columns } from "@/data/team";
import { useTeam } from "@/hooks/useApi";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Team } from "@/types/team";
import { useEffect } from "react";


export default function TeamPage() {  
  const sidePanel = useSidePanel<Team>();
  const {data, getAll, remove} = useTeam();

  useEffect(() => {getAll()}, []);

  const handleDelete = async (row:any) => {
    await remove(row.id);
  }

  const handleSuccess = async () => {
    await getAll(); 
    sidePanel.close();
  };

  return (
    <>
      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Team Member" : "Add New Team Member"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <TeamForm initialValues={{
            first_name: sidePanel.selectedItem.last_name, 
            last_name: sidePanel.selectedItem.first_name, 
            email: sidePanel.selectedItem.email, 
            role: sidePanel.selectedItem.role}} 
            edit={true} 
            id={sidePanel.selectedItem.id}
            onSuccess={handleSuccess}
          />
        ) : (

          <TeamForm initialValues={{
              first_name: "", 
              last_name:"", email: "", 
              role:""
            }} 
            edit={false} 
            onSuccess={handleSuccess} 
          />
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