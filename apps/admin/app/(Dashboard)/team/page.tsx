"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";

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
  const handleAddMember = () => {
    console.log("Adding team member...");
  }; 

  const handleEdit = (Team: Team) => {
    console.log('Edit Team:', Team);

    alert(`Edit: ${Team.name}`);
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
  return (
  

    <>

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