import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ArticleTransformClientData,
  ArticlesTranformClientData,
} from '@seye-bamidele/shared-types';

interface ArticleCacheStore {
  fullArticles: Record<string, ArticleTransformClientData>;
  articleSummaries: Record<string, ArticlesTranformClientData>;
  hasHydrated: boolean;

  cacheFullArticle: (article: ArticleTransformClientData) => void;
  cacheArticleSummaries: (articles: ArticlesTranformClientData[]) => void;
  getFullArticle: (id: string) => ArticleTransformClientData | null;
  clearCache: () => void;
}

export const useArticleCache = create<ArticleCacheStore>()(
  persist(
    (set, get) => ({
      fullArticles: {},
      articleSummaries: {},
      hasHydrated: false,

      cacheFullArticle: (article) =>
        set((state) => ({
          fullArticles: { ...state.fullArticles, [article.id]: article },
        })),

      cacheArticleSummaries: (articles) =>
        set((state) => {
          const incoming = articles.reduce((acc, article) => {
            acc[article.id] = article;
            return acc;
          }, {} as Record<string, ArticlesTranformClientData>);

          return {
            articleSummaries: { ...state.articleSummaries, ...incoming },
          };
        }),

      getFullArticle: (id) => get().fullArticles[id] || null,

      clearCache: () =>
        set({
          fullArticles: {},
          articleSummaries: {},
        }),
    }),
    {
      name: 'article-cache',
      onRehydrateStorage: () => (state) => {
        // ✅ fires AFTER persisted state is restored
        state?.hasHydrated === false &&
          state &&
          (state.hasHydrated = true);
      },
    }
  )
);
