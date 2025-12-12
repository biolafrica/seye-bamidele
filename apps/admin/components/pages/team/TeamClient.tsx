"use client"

import { useEffect, useState } from "react";
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

export default function TeamClient() {  
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TeamData | null>(null);
  

  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sidePanel = useSidePanel<TeamSidePanelData>();
  const { data, pagination, loading, getAll, remove } = useTeam();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page?: number, limit?: number) => {
    const params: Record<string, string> = {
      page: (page || pagination.page).toString(),
      limit: (limit || pagination.limit).toString(),
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    
    await getAll(params);
  };

  const handlePageChange = (page: number) => {
    fetchData(page, pagination.limit);
  };

  const handleItemsPerPageChange = (limit: number) => {
    fetchData(1, limit); 
  };

  const handleSort = (key: string, direction: 'asc' | 'desc' | null) => {
    if (direction === null) {
      setSortBy('created_at');
      setSortOrder('desc');
    } else {
      setSortBy(key);
      setSortOrder(direction);
    }
    
  
    const params: Record<string, string> = {
      page: '1', 
      limit: pagination.limit.toString(),
      sortBy: direction ? key : 'created_at',
      sortOrder: direction || 'desc',
    };
    
    getAll(params);
  };

  const handleDeleteClick = async (row: any) => {
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
    await fetchData(); 
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
        title="Delete Team Member"
        message={`Are you sure you want to delete "${itemToDelete?.first_name} ${itemToDelete?.last_name || 'this team member'}"? This action cannot be undone.`}
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
          data={data || []}
          pagination={pagination}
          loading={loading}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSort={handleSort}
          onEdit={sidePanel.openEdit}
          onDelete={handleDeleteClick}
          sortBy={sortBy}
          sortOrder={sortOrder}
          emptyMessage={teamEmptymessage}
        />
      </div>
    </>
  )
}