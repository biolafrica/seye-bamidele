"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PageSkeleton, formatDateWord, useArticles } from "@seye-bamidele/ui";
import Link from "next/link";
import { useEffect } from "react";

export default function HomeBlog() {
  const { data: articles, getAll, loading } = useArticles()

  useEffect(() => {
    getAll({ page: '1', limit: '3' });
  }, []);


  return(
    <div className="lg:col-span-3 space-y-5 lg:mr-24 mb-20">

      {loading && <PageSkeleton/>}
      {articles.map((item, idx) => (

        <div key={idx} className="rounded-xl mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-6 md:3/4 md:mt-0">
          
          <h2 className="text-sm text-secondary border-l border-border pl-2">
            {formatDateWord(item.created_at)}
          </h2>
          
          <h2 className="text-base font-semibold text-heading mt-3">
            {item.title}
          </h2>
      
          <p className="mt-2 text-secondary text-sm leading-relaxed">
            {item.excerpt }
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


  )
}