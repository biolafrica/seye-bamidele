import { DBArticle, Article, BlogArticle } from '@/types/article';


export function transformArticles(dbArticles: DBArticle[]): Article[] {
  return dbArticles
    .map((item) => ({
      date: new Date(item.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      title: item.title,
      excerpt: item.excerpt,
      link: {
        text: "Read article",
        url: `/articles/${item.id}`,
      },
    }))
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function transformToBlogArticle(dbArticle: DBArticle): BlogArticle {
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
    read: undefined,
    author: undefined,
  };
}

