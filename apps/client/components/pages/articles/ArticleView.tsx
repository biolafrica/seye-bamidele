"use client"

import { ArrowLeftCircleIcon, CalendarDateRangeIcon} from "@heroicons/react/24/outline";
import SharePost from "../../common/share";
import { insertImagesIntoSections, parseContent, renderSection } from "@/app/utils/common/articleModification";
import { formatDate } from "@seye-bamidele/utils";
import { ArticleTransformClientData } from "@seye-bamidele/shared-types";



export default function ArticleView({ article }: { 
  article:ArticleTransformClientData
}) {
 
  const imageArray = article.images 
  ? Object.values(article.images).filter(img => img && img.trim() !== '')
  : [];
  const sections = parseContent(article.content || '');
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
            <span className="font-medium">Back to article</span>
          </button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <header className="mb-8 md:mb-12">
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-secondary mb-4">
            <div className="flex items-center">
              <CalendarDateRangeIcon className="w-4 h-4 mr-1.5" />
              <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 leading-tight">
            {article.title || 'Untitled Post'}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-separator">
            <div className="flex items-center">
              <div>
                <p className="font-medium text-heading">Seye Bamdele</p>
                <p className="text-sm text-secondary">Author</p>
              </div>
            </div>
          
            <SharePost article={article} />
            
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

            <SharePost article={article} />

          </div>
        </footer>

      </article>

    </div>
  );
}