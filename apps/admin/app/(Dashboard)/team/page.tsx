"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import ModifyTeam from "@/components/pages/team/modifyTeam";
import { useState } from "react";

interface Team {
  id: number;
  name: string;
  email: string;
  dateRegistered: string;
}

const TeamData: Team[] = [
  {
    id: 1,
    name: 'Seye Bamidele',
    email: 'seye@paidHr.com',
    dateRegistered: '26-05-2025',
  },
  {
    id: 2,
    name: 'Abiodun Biobaku',
    email: 'biolafrica@gmail.com',
    dateRegistered: '06-06-2025',
  },
 
];

export default function TeamPage() {  
  const [sideScreenOpen, setSideScreenOpen] = useState<boolean>(false);
  const [editSideScreenOpen, setEditSideScreenOpen] = useState<boolean>(false);
  const [addSideScreenOpen, setAddSideScreenOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Team | null>(null);

  const handleAddMember = () => {
    setSideScreenOpen(true);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(true);
  }; 

  const handleEdit = (Team: Team) => {
    console.log('Edit Team:', Team);
    setSelectedItem(Team);
    setSideScreenOpen(true);
    setEditSideScreenOpen(true);
    setAddSideScreenOpen(false);
  };

  const handleDelete = (Team: Team) => {
    console.log('Delete Team:', Team);
    if (confirm(`Are you sure you want to delete ${Team.name}?`)) {
      alert(`Deleted: ${Team.name}`);
    }
  };

  const columns: TableColumn<Team>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'dateRegistered',
      header: 'Date Registered',
      sortable: false,
    },

  ];

  const closeAll = (): void => {
    setSideScreenOpen(false);
    setEditSideScreenOpen(false);
    setAddSideScreenOpen(false);
  };

  return (
    <>

      {sideScreenOpen && (
        <div className="fixed inset-0 z-60 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeAll}
          />
          <div className="relative z-65">
            {addSideScreenOpen && <ModifyTeam onClose={closeAll} />}
            {editSideScreenOpen && (
              <ModifyTeam onClose={closeAll} row={selectedItem} />
            )}
          </div>
        </div>
      )}

      <PageHeader
        heading="Team"
        subHeading="Manage your team members"
        buttonText="Add Member"
        onButtonClick={handleAddMember}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={TeamData}
          onEdit={(Team) => handleEdit(Team)}
          onDelete={(Team) => handleDelete(Team)}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>
    
    </>
  )
}