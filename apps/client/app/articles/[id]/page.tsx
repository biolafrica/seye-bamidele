import { getArticleById } from "@/app/utils/database/getTasks";
import ArticleViewClient from "@/components/pages/articles/ArticleViewClient";
import {createMetadata } from "@seye-bamidele/ui";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  return createMetadata({
    title: article?.title,
    description: article?.excerpt,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } =  await params;
  return (<ArticleViewClient id={id}/>);
}