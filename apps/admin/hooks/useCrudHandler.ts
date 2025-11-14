export function useCrudHandlers<T extends { id: number; title?: string; name?: string }>() {
  const handleDelete = (item: T, onDeleteSuccess?: (item: T) => void) => {
    const itemName = 'title' in item ? item.title : 'name' in item ? item.name : 'this item';
    
    if (confirm(`Are you sure you want to delete ${itemName}?`)) {
      console.log('Delete item:', item);
      alert(`Deleted: ${itemName}`);
      onDeleteSuccess?.(item);
    }
  };

  return { handleDelete };
}