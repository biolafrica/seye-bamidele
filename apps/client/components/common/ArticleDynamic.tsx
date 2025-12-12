"use client";

import { transformArticles } from "@/app/utils/common/transformArticle";

import { useState, useEffect } from "react";
import PageSection from "../sections/PageSection";
import { Article } from "@/types/article";
import { useArticles } from "@seye-bamidele/ui";


export default function ArticlesPage() {
  const { data: dbArticles, pagination, getAll, loading } = useArticles(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const itemsPerPage = 10;


  useEffect(() => {
    getAll({ page: '1', limit: String(itemsPerPage) });
  }, []);


  useEffect(() => {
    if (dbArticles) {
      const transformed = transformArticles(dbArticles);
      
      if (currentPage === 1) {
        setAllArticles(transformed);
      } else {
        setAllArticles(prev => [...prev, ...transformed]);
      }
    }
  }, [dbArticles]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getAll({ page: String(nextPage), limit: String(itemsPerPage) });
  };

  const hasMore = pagination ? currentPage < pagination.totalPages : false;

  return (
    <div>
      <PageSection
        items={allArticles}
        variant="articles"
        hasMore={hasMore}
        isLoading={loading}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
