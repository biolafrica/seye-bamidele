import { Article, DBArticle } from "@/types/article";

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
      ...(item.images && { images: item.images }),
    }))

    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

