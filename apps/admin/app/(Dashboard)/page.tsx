"use client"

//import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import StatsCards from "@/components/common/statCard";
//import { ArticleData, columns } from "@/data/articles";
import { Article } from "@/types/articles";


export default function Home() {
  const handleEdit = (Article: Article) => {
    console.log('Edit Article:', Article);

    alert(`Edit: ${Article.title}`);
  };

  const handleDelete = (Article: Article) => {
    console.log('Delete Article:', Article);
    if (confirm(`Are you sure you want to delete ${Article.title}?`)) {
      alert(`Deleted: ${Article.title}`);
    }
  };

  return (
    <main className="">
      <PageHeader
        heading="Dashboard"
        subHeading="Welocome back seye Bamdele"
        showButton={false}
      />
      <StatsCards/>
      <div className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4 mx-4 sm:mx-6 lg:mx-8 border border-border rounded-md bg-white">

        <h4 className="mb-3 text-secondary">Recent Articles</h4>

        {/*<DataTable
          columns={columns}
          data={ArticleData}
          onEdit={(Article) => handleEdit(Article)}
          onDelete={(Article) => handleDelete(Article)}
          defaultItemsPerPage={10}
          showPagination={false}
        />*/}
        
      </div>
    </main>
  );
}
