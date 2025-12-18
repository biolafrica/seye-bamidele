"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PageSkeleton, formatDateWord, useArticles } from "@seye-bamidele/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useArticleCache } from "@/lib/stores/article-cache";

export default function HomeBlog() {
  const { data: articles, getAll, loading } = useArticles();
  const { articleSummaries } = useArticleCache();
  
  const [displayArticles, setDisplayArticles] = useState<any[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const cachedArticles = Object.values(articleSummaries).slice(0, 3);
    
    if (cachedArticles.length > 0) {
      setDisplayArticles(cachedArticles.map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        created_at: article.date,
      })));
    }
    
    if (!hasFetched) {
      getAll({ page: '1', limit: '3' });
      setHasFetched(true);
    }
  }, [articleSummaries, hasFetched]);

  useEffect(() => {
    if (articles.length > 0) {
      setDisplayArticles(articles);
    }
  }, [articles]);

  return (
    <div className="lg:col-span-3 space-y-5 lg:mr-24 mb-20">
      {loading && displayArticles.length === 0 && <PageSkeleton />}
      
      {displayArticles.slice(0, 3).map((item, idx) => (
        <div 
          key={item.id || idx} 
          className="rounded-xl mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-6 md:3/4 md:mt-0"
        >
          <h2 className="text-sm text-secondary border-l border-border pl-2">
            {formatDateWord(item.created_at || item.date)}
          </h2>
          
          <h2 className="text-base font-semibold text-heading mt-3">
            {item.title}
          </h2>
      
          <p className="mt-2 text-secondary text-sm leading-relaxed">
            {item.excerpt}
          </p>

          <Link
            href={`/articles/${item.id}`}
            className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
          >
            Read article
            <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ))}
    </div>
  );
}