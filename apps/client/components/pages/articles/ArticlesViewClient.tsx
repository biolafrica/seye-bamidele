'use client';

import PageSection from '../../sections/PageSection';
import { useArticles } from '@seye-bamidele/ui';
import { transformArticles } from '@/app/utils/common/transformArticle';
import { ArticlesTranformClientData } from '@seye-bamidele/shared-types';
import { usePaginatedClientList } from '@/hook/usePaginatedClientList';


export default function ArticlesViewClient() {
  const { items, loading, hasMore, loadMore } =
    usePaginatedClientList<any, ArticlesTranformClientData>({
      useSource: useArticles,
      transform: transformArticles,
      itemsPerPage: 10,
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
