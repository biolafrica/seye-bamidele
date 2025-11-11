interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-5">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-heading">
        {title}
      </h1>
      <p className="mt-4 text-secondary text-base">{description}</p>
    </header>
  );
}
