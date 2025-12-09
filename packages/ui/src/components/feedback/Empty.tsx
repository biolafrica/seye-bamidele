interface EmptyProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Empty = ({ 
  title = 'No data', 
  message = 'No items to display.',
  icon,
  action 
}: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-heading mb-2">{title}</h3>
      <p className="text-secondary mb-4 max-w-md">{message}</p>
      {action}
    </div>
  );
};