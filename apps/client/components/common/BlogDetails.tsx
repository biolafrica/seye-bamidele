"use client"
import { ArrowLeftCircleIcon, CalendarDateRangeIcon, ClockIcon } from "@heroicons/react/24/outline";
import SharePost from "./share";
import { insertImagesIntoSections, parseContent, renderSection } from "@/app/utils/common/blogModification";
import { formatDate } from "@seye-bamidele/utils";


interface Blog {
  id: string;
  title: string;
  content: string | null;
  image: string | null;
  images: {
    image_1: string;
    image_2: string;
    image_3: string;
  } | null;
  created_at: string;
  excerpt: string;
  read?: number;
  author?: string;
}

interface BlogDetailPageProps {
  blog: Blog;
}

export default function BlogDetailPage({ blog }: BlogDetailPageProps) {
  const imageArray = blog.images 
  ? Object.values(blog.images).filter(img => img && img.trim() !== '')
  : [];
  
  const sections = parseContent(blog.content || '');
  const contentWithImages = insertImagesIntoSections(sections, imageArray);

  return (
    <div className="min-h-screen">

      <nav className=" sticky top-0 z-50 backdrop-blur-sm bg-card/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-secondary hover:text-heading transition-colors group"
          >
            <ArrowLeftCircleIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <header className="mb-8 md:mb-12">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-secondary mb-4">
            <div className="flex items-center">
              <CalendarDateRangeIcon className="w-4 h-4 mr-1.5" />
              <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
            </div>
            {blog.read && (
              <>
                <span>•</span>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1.5" />
                  <span>{blog.read} minute read</span>
                </div>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 leading-tight">
            {blog.title || 'Untitled Post'}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-separator">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-semibold text-lg mr-3">
                {blog.author ? blog.author.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <p className="font-medium text-heading">{blog.author || 'Seye Bamdele'}</p>
                <p className="text-sm text-secondary">Author</p>
              </div>
            </div>
          
            <SharePost blog={blog} />
            
          </div>
        </header>

        <div className="prose prose-lg max-w-none 
          prose-headings:text-heading 
          prose-p:text-text 
          prose-a:text-accent hover:prose-a:text-accent-hover
          prose-strong:text-heading
          prose-blockquote:text-secondary
          prose-code:text-text
          prose-pre:bg-hover
          dark:prose-invert
        ">
          {contentWithImages.map((section, index) => renderSection(section, index))}
        </div>

        <footer className="mt-12 pt-8 border-t border-separator">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-secondary">
              Thanks for reading! Share this article if you found it helpful.
            </p>

            <SharePost blog={blog} />

          </div>
        </footer>

      </article>

    </div>
  );
}