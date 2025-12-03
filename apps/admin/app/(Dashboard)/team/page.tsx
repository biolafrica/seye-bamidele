"use client"

import { canUserPerform } from "@/app/utils/supabase/auth-utils";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import Alert from "@/components/common/alert";
import ConfirmBanner from "@/components/common/confirmBanner";
import TeamForm from "@/components/pages/TeamForm";
import {columns } from "@/data/team";
import { useTeam } from "@/hooks/useApi";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Team } from "@/types/team";
import { useEffect, useState } from "react";


export default function TeamPage() {  
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const sidePanel = useSidePanel<Team>();
  const {data, getAll, remove} = useTeam();

  useEffect(() => {getAll()}, []);

  const handleDeleteClick = async(row: any) => {
    const canDelete = await canUserPerform('delete_user');
    if (!canDelete) {
      setErrorMsg('You do not have permission to delete users')
      return
    }
    setItemToDelete(row);
    setShowDialog(true);
  }

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await remove(itemToDelete.id);
      setShowSuccess("The user has been deleted.")
      setShowDialog(false);
      setItemToDelete(null);
      setTimeout(() => {
        setShowSuccess("")
      }, 1500)
    } catch (error) {
      setErrorMsg("Failed to delete user.");
      console.error("Error deleting user:", error);
      setShowDialog(false);
      setItemToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setShowDialog(false);
    setItemToDelete(null);
  }

  const handleSuccess = async (action: "created" | "updated") => {
    await getAll(); 
    sidePanel.close();
    setShowSuccess(`User has been ${action}.`);
    setTimeout(() => {
      setShowSuccess("")
    }, 1500)
  };

  return (
    <>
      {showSuccess && (
        <Alert
          type="success"
          heading="successfully"
          subheading={showSuccess}
          duration={2000}
          onClose={() => setShowSuccess("")}
        />
      )}

      {errorMsg && (
        <Alert
          type="error"
          heading='Error'
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}

      <ConfirmBanner
        open={showDialog}
        title="Delete Article"
        message={`Are you sure you want to delete "${itemToDelete?.first_name + itemToDelete?.last_name|| 'this event'}"? This action cannot be undone.`}
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

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
          onDelete={handleDeleteClick}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    </>
  )
}