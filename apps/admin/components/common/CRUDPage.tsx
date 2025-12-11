"use client";

import { useEffect, useState } from "react";
import { Alert, ConfirmBanner } from "@seye-bamidele/ui";
import SidePanel from "@/components/common/SidePanel";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { useSidePanel } from "@/hooks/useSidePanel";

export interface CRUDPageProps<T> {
  title: string;
  subTitle: string;
  columns: any[];
  useApi: () => {
    data: T[] | undefined;
    pagination: { page: number; limit: number; total: number; totalPages: number };
    loading: boolean;
    getAll: (params?: Record<string, string>) => Promise<void>;
    remove?: (id: string) => Promise<void>;
  };
  FormComponent: React.FC<{
    initialValues: Partial<T>;
    edit: boolean;
    id?: string;
    item?: T | null;
    onSuccess: (action: "created" | "updated") => void;
  }>;
  canDelete?: (item: T) => Promise<boolean>;
}

export function CRUDPage<T extends { id: string; title?: string }>({
  title,
  subTitle,
  columns,
  useApi,
  FormComponent,
  canDelete,
}: CRUDPageProps<T>) {
  const [showSuccess, setShowSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sidePanel = useSidePanel<T>();
  const { data, pagination, loading, getAll, remove } = useApi();

  useEffect(() => {
    fetchData();
  }, [sortBy, sortOrder]);

  const fetchData = async (page?: number, limit?: number,) => {
    const params = {
      page: (page || pagination.page).toString(),
      limit: (limit || pagination.limit).toString(),
      sortBy,
      sortOrder,
    };
    await getAll(params);
  };

  const handlePageChange = (page: number) => fetchData(page, pagination.limit);
  const handleItemsPerPageChange = (limit: number) => fetchData(1, limit);

  const handleSort = (key: string, direction: "asc" | "desc" | null) => {
    setSortBy(direction ? key : "created_at");
    setSortOrder(direction || "desc");
    fetchData(1, pagination.limit);
  };

  const handleDeleteClick = async (row: T) => {
    if (canDelete && !(await canDelete(row))) {
      setErrorMsg("You do not have permission to delete this item");
      return;
    }
    setItemToDelete(row);
    setShowDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete || !remove) return;
    try {
      await remove(itemToDelete.id);
      setShowSuccess(`${title} deleted successfully`);
      setShowDialog(false);
      setItemToDelete(null);
      fetchData();
    } catch (err) {
      setErrorMsg(`Failed to delete ${title}`);
      console.error(err);
    }
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
    setItemToDelete(null);
  };

  const handleSuccess = async (action: "created" | "updated") => {
    fetchData();
    sidePanel.close();
    setShowSuccess(`${title} ${action} successfully`);
    setTimeout(() => setShowSuccess(""), 1500);
  };

  return (
    <>
      {showSuccess && (
        <Alert
          type="success"
          heading="Success"
          subheading={showSuccess}
          duration={2000}
          onClose={() => setShowSuccess("")}
        />
      )}

      {errorMsg && (
        <Alert
          type="error"
          heading="Error"
          subheading={errorMsg}
          duration={5000}
          onClose={() => setErrorMsg("")}
        />
      )}

      {remove && (
        <ConfirmBanner
          open={showDialog}
          title={`Delete ${title}`}
          message={`Are you sure you want to delete "${
            itemToDelete?.title || "this item"
          }"? This action cannot be undone.`}
          variant="danger"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <SidePanel
        isOpen={sidePanel.isOpen}
        onClose={sidePanel.close}
        title={sidePanel.mode === "edit" ? `Edit ${title}` : `Add ${title}`}
      >
        <FormComponent
          initialValues={sidePanel.selectedItem || {}}
          edit={sidePanel.mode === "edit"}
          id={sidePanel.selectedItem?.id}
          item={sidePanel.selectedItem}
          onSuccess={handleSuccess}
        />
      </SidePanel>

      <PageHeader
        heading={title}
        subHeading={subTitle}
        buttonText={`Add ${title}`}
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
        />
      </div>
    </>
  );
}
