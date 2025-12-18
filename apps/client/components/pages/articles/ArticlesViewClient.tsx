'use client';

import { useState, useEffect } from 'react';
import PageSection from '../../sections/PageSection';
import { useArticles } from '@seye-bamidele/ui';
import { transformArticles } from '@/app/utils/common/transformArticle';
import { ArticlesTranformClientData } from '@seye-bamidele/shared-types';
import { usePaginatedClientList } from '@/hook/usePaginatedClientList';
import { useArticleCache } from '@/lib/stores/article-cache';

export default function ArticlesViewClient() {
  const { cacheArticleSummaries, articleSummaries } = useArticleCache();
  
  // Initialize with cached articles BEFORE hook runs
  const [displayItems, setDisplayItems] = useState<ArticlesTranformClientData[]>(
    () => Object.values(articleSummaries)
  );

  const { items, loading, hasMore, loadMore } = usePaginatedClientList({
    useSource: useArticles,
    transform: transformArticles,
    itemsPerPage: 10,
    onItemsTransformed: (transformedArticles: ArticlesTranformClientData[]) => {
      cacheArticleSummaries(transformedArticles);
    },
  });

  // Update display when fresh items arrive
  useEffect(() => {
    if (items.length > 0) {
      setDisplayItems(items);
    }
  }, [items]);

  return (
    <PageSection
      items={displayItems}
      variant="articles"
      hasMore={hasMore}
      isLoading={loading && displayItems.length === 0}
      onLoadMore={loadMore}
    />
  );
}

