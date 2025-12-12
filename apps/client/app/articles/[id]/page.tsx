import { getArticleById } from "@/app/utils/database/getTasks";
import SelectedArticle from "@/components/pages/articles/ArticleViewClient";
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

export default async function SelectedBlog({ params }: PageProps) {
  const { id } =  await params;
  return (<SelectedArticle id={id}/>);
}