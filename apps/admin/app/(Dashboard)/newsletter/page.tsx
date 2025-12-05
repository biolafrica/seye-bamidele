"use client"

import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import SidePanel from "@/components/common/SidePanel";
import Alert from "@/components/common/alert";
import NewsletterDetails from "@/components/pages/NewsletterDetails";
import NewsletterForm from "@/components/pages/NewsletterForm";
import { columns } from "@/data/newsletter";
import { useNewsletter } from "@/hooks/useApi";
import { useSidePanel } from "@/hooks/useSidePanel";
import { Newsletter } from "@/types/newsletter";
import { useEffect, useState } from "react";

export default function NewsletterPage() {  
  const [showSuccess, setShowSuccess] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sidePanel = useSidePanel<Newsletter>();
  const { data, pagination, loading, getAll} = useNewsletter();


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


  const handleSuccess = async (action: "created" | "updated") => {
    await fetchData(); 
    sidePanel.close();
    setShowSuccess(`The newsletter has been ${action}.`);
    setTimeout(() => {
      setShowSuccess("")
    }, 1500)
  };

  return (
    <>
      {showSuccess && (
        <Alert
          type="success"
          heading="Successfully"
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

      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === 'edit' ? "Edit Newsletter" : "Create Newsletter"}
      >
        {sidePanel.mode === 'edit' && sidePanel.selectedItem ? (
          <NewsletterDetails/>
        ) : (
          <NewsletterForm 
            initialValues={{ 
              subject: '',
              content: '',  
            }} 
            onSuccess={handleSuccess} 
          />
        )}
      </SidePanel>
      
      <PageHeader
        heading="Newsletters"
        subHeading="Manage your newsletter publications"
        buttonText="Create Newsletter"
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
          onMore={sidePanel.openEdit}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>
    </>
  )
}