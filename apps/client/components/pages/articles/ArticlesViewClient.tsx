'use client';

import PageSection from '../../sections/PageSection';
import { useArticles } from '@seye-bamidele/ui';
import { transformArticles } from '@/app/utils/common/transformArticle';
import { ArticlesTranformClientData } from '@seye-bamidele/shared-types';
import { usePaginatedClientList } from '@/hook/usePaginatedClientList';
import { useArticleCache } from '@/lib/stores/article-cache';

export default function ArticlesViewClient() { 
  const { cacheArticleSummaries } = useArticleCache();

  const { items, loading, hasMore, loadMore } = usePaginatedClientList({
    useSource: useArticles,
    transform: transformArticles,
    itemsPerPage: 10,
    onItemsTransformed: (transformedArticles: ArticlesTranformClientData[]) => {
      cacheArticleSummaries(transformedArticles);
    },
  });

  return (
    <PageSection
      items={items}
      variant="articles"
      hasMore={hasMore}
      isLoading={loading}
      onLoadMore={loadMore}
    />
  );
}
