import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-heading mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-heading mb-4">
          Article Not Found
        </h2>
        <p className="text-secondary mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          <ArrowLeftCircleIcon className="w-5 h-5" />
          Back to Articles
        </Link>
      </div>
    </div>
  );
}