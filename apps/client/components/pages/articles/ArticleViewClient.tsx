'use client'

import { useEffect, useState } from 'react';
import { PageSkeleton, useArticles } from '@seye-bamidele/ui';
import ArticleView from '@/components/pages/articles/ArticleView';
import { transformArticle } from '@/app/utils/common/transformArticle';
import { ArticleTransformClientData } from '@seye-bamidele/shared-types';

export default function ArticleViewClient({ id }: { id: string }) {
  const { getOne, loading, error } = useArticles();
  const [article, setArticle] = useState<ArticleTransformClientData | null>(null);

  useEffect(() => {
    getOne(id)
    .then(transformArticle)
    .then(setArticle)
    .catch(console.error);
  }, [id]);

  if (loading) return <PageSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return <ArticleView article={article} />;
}
