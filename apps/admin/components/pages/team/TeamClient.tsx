"use client"

import { useState } from "react";
import { useTeam } from "../../../../../packages/ui/src/hooks/useApi";
import { canUserPerform } from "@/app/utils/supabase/auth-utils";
import { Alert, ConfirmBanner } from "@seye-bamidele/ui";
import SidePanel from "@/components/common/SidePanel";
import TeamForm from "./TeamForm";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { columns } from "@/data/team";
import { useSidePanel } from "@/hooks/useSidePanel";
import { TeamData, TeamSidePanelData } from "@seye-bamidele/shared-types";
import { teamEmptymessage } from "@/app/utils/common/emptyTableObjects";
import { useAdminTablePage } from "@/hooks/useAdminTablePage";
import { useDeleteAction } from "@/hooks/useDeleteAction";

export default function TeamClient() {  
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const sidePanel = useSidePanel<TeamSidePanelData>();

  const table = useAdminTablePage({ useSource: useTeam });

  const deleteAction = useDeleteAction<TeamSidePanelData>({
    onDelete: async (item) => {
      await table.remove?.(item.id);
    },
    onSuccess: async () => {
      setShowSuccess("The user has been deleted.");
      await table.fetchData();
    },
    onError: () => {
      setErrorMsg("Failed to delete team member.");
    },
  });

  const handleDeleteRequest = async (row: TeamData) => {
    const canDelete = await canUserPerform('delete_user');

    if (!canDelete) {
      setErrorMsg('You do not have permission to delete users.');
      return;
    }

    deleteAction.requestDelete(row);
  };

  const handleSuccess = async (action: "created" | "updated") => {
    await table.fetchData(); 
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
        open={deleteAction.showDialog}
        title="Delete Team Member"
        message={`Are you sure you want to delete "${deleteAction.itemToDelete?.first_name} ${deleteAction.itemToDelete?.last_name || 'this team member'}"? This action cannot be undone.`}
        variant="danger"
        onConfirm={deleteAction.confirmDelete}
        onCancel={deleteAction.cancelDelete}
      />

      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Team Member" : "Add New Team Member"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <TeamForm 
            initialValues={{
              first_name: sidePanel.selectedItem.first_name, 
              last_name: sidePanel.selectedItem.last_name, 
              email: sidePanel.selectedItem.email, 
              role: sidePanel.selectedItem.role
            }} 
            edit={true} 
            id={sidePanel.selectedItem.id}
            onSuccess={handleSuccess}
          />
        ) : (
          <TeamForm 
            initialValues={{
              first_name: "", 
              last_name: "", 
              email: "", 
              role: ""
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
          data={table.data || []}
          pagination={table.pagination}
          loading={table.loading}
          onPageChange={table.handlePageChange}
          onItemsPerPageChange={table.handleItemsPerPageChange}
          onSort={table.handleSort}
          onEdit={sidePanel.openEdit}
          onDelete={handleDeleteRequest}
          sortBy={table.sortBy}
          sortOrder={table.sortOrder}
          emptyMessage={teamEmptymessage}
        />
      </div>
    </>
  )
}