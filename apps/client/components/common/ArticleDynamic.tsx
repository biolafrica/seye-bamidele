import { getArticles } from "@/app/utils/database/getTasks";
import PageSection from "./PageSection";
import { transformArticles } from "@/app/utils/common/transformArticle";

export default async function ArticleDynamic() {
  const article = await getArticles();
  const articles = transformArticles(article);
  return (
    <>
      <PageSection items={articles} variant="articles" />
    </>
  )
}