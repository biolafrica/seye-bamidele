'use client'

import { useEffect, useState } from 'react';
import BlogDetailPage from '@/components/common/ArticleDetails';
import { PageSkeleton, useArticles } from '@seye-bamidele/ui';
import { transformToBlogArticle } from '@/app/utils/common/transformArticle';

interface SelectedBlogProps {
  id: string;
}

export default function SelectedArticle({ id }: SelectedBlogProps) {
  const { getOne } = useArticles();
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const dbArticle = await getOne(id);
        if (!dbArticle) throw new Error('Article not found');
        setArticle(transformToBlogArticle(dbArticle));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  if (loading) return <PageSkeleton/>;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{error}</p>
      </div>
    );

  return <BlogDetailPage blog={article} />;
}
