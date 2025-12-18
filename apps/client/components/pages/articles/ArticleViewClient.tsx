'use client';

import { useEffect, useState } from 'react';
import { PageSkeleton, useArticles } from '@seye-bamidele/ui';
import ArticleView from '@/components/pages/articles/ArticleView';
import { transformArticle } from '@/app/utils/common/transformArticle';
import { ArticleTransformClientData } from '@seye-bamidele/shared-types';
import { useArticleCache } from '@/lib/stores/article-cache';

export default function ArticleViewClient({ id }: { id: string }) {
  const { getOne, loading, error } = useArticles();
  const { getFullArticle, cacheFullArticle } = useArticleCache();
  
  const [article, setArticle] = useState<ArticleTransformClientData | null>(() => getFullArticle(id));
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const cachedArticle = getFullArticle(id);
    if (cachedArticle) {
      setArticle(cachedArticle);
      return;
    }

    setIsFetching(true);
    getOne(id)
      .then(transformArticle)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        cacheFullArticle(fetchedArticle);
      })
      .catch(console.error)
      .finally(() => setIsFetching(false));
  }, [id]);

  if ((loading || isFetching) && !article) return <PageSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return <ArticleView article={article} />;
}
