export default function PageHeader() {
  return (
    <header className="border-b border-separator fixed top-0 inset-x-0 z-60 bg-background">
      <div className="flex items-center py-6 px-4 lg:px-20">
        <h1 className="text-2xl font-bold leading-none text-heading">
          header
        </h1>
      </div>
    </header>
  );
}