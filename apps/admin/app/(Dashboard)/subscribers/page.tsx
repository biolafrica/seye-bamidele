"use client"

import DataTable, { TableColumn } from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";

interface Newsletter {
  id: number;
  date: string;
  title: string;
}

const NewsletterData: Newsletter[] = [
  {
    id: 1,
    title: 'the best way to learn React',
    date: '26-05-2025',
  },
  {
    id: 2,
    title: 'understanding TypeScript basics',
    date: '23-05-2025',
  },
];

export default function SubscribersPage() {   
  const handleCreateNewsletter = () => {
    console.log("Creating newsletter...");
  };
  
  const handleEdit = (Newsletter: Newsletter) => {
    console.log('Edit Newsletter:', Newsletter);

    alert(`Edit: ${Newsletter.title}`);
  };

  const handleDelete = (Newsletter: Newsletter) => {
    console.log('Delete Newsletter:', Newsletter);
    if (confirm(`Are you sure you want to delete ${Newsletter.title}?`)) {
      alert(`Deleted: ${Newsletter.title}`);
    }
  };

  const columns: TableColumn<Newsletter>[] = [
    {
      key: 'date',
      header: 'Date',
      sortable: false,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
    }
  ];
  return(
 

    <>
      <PageHeader
        heading="Subscribers"
        subHeading="Manage your newsletter subscribers"
        buttonText="Create Newsletter"
        onButtonClick={handleCreateNewsletter}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DataTable
          columns={columns}
          data={NewsletterData}
          onEdit={(Newsletter) => handleEdit(Newsletter)}
          onDelete={(Newsletter) => handleDelete(Newsletter)}
          defaultItemsPerPage={10}
          showPagination={false}
        />
      </div>

    </>
  )
}