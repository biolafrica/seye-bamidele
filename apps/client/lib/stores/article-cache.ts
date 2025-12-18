import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  ArticleTransformClientData, 
  ArticlesTranformClientData 
} from '@seye-bamidele/shared-types';

interface ArticleCacheStore {
  fullArticles: Record<string, ArticleTransformClientData>;
  articleSummaries: Record<string, ArticlesTranformClientData>;
  
  cacheFullArticle: (article: ArticleTransformClientData) => void;
  cacheArticleSummaries: (articles: ArticlesTranformClientData[]) => void;
  getFullArticle: (id: string) => ArticleTransformClientData | null;
  getArticleSummary: (id: string) => ArticlesTranformClientData | null;
  clearCache: () => void;
}

export const useArticleCache = create<ArticleCacheStore>()(
  persist(
    (set, get) => ({
      fullArticles: {},
      articleSummaries: {},
      
      cacheFullArticle: (article) =>
        set((state) => ({
          fullArticles: { ...state.fullArticles, [article.id]: article }
        })),
      
      cacheArticleSummaries: (articles) =>
        set((state) => {
          const newSummaries = articles.reduce((acc, article) => {
            acc[article.id] = article;
            return acc;
          }, {} as Record<string, ArticlesTranformClientData>);
          
          return {
            articleSummaries: { ...state.articleSummaries, ...newSummaries }
          };
        }),
      
      getFullArticle: (id) => get().fullArticles[id] || null,
      
      getArticleSummary: (id) => get().articleSummaries[id] || null,
      
      clearCache: () => set({ fullArticles: {}, articleSummaries: {} }),
    }),
    { 
      name: 'article-cache',
    }
  )
);