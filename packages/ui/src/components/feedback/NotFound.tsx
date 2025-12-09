interface NotFoundProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export const NotFound = ({ 
  title = 'Not Found', 
  message = 'The page you are looking for does not exist.',
  action 
}: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-heading mb-2">{title}</h1>
      <p className="text-secondary mb-6 max-w-md">{message}</p>
      {action}
    </div>
  );
};