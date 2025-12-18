import { ArticleData, ArticleTransformClientData, ArticlesTranformClientData, } from '@seye-bamidele/shared-types';
import { formatDateWord } from '@seye-bamidele/ui';


export function transformArticles(dbArticles: ArticleData[]): ArticlesTranformClientData[] {
  return dbArticles
    .map((item) => ({
      date: formatDateWord(item.created_at),
      title: item.title,
      excerpt: item.excerpt,
      link: {
        text: "Read article",
        url: `/articles/${item.id}`,
      },
      id:item.id
    }))
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function transformArticle(dbArticle: ArticleData): ArticleTransformClientData {
  const imagesObj = dbArticle.images && dbArticle.images.length > 0
  ? {
      image_1: dbArticle.images[0] || '',
      image_2: dbArticle.images[1] || '',
      image_3: dbArticle.images[2] || '',
    }
  : null;

  return {
    id: dbArticle.id,
    title: dbArticle.title,
    content: dbArticle.content,
    image: dbArticle.image,
    images: imagesObj,
    created_at: dbArticle.created_at,
    excerpt: dbArticle.excerpt,
  };
}

