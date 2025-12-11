import { transformToBlogArticle } from "@/app/utils/common/transformArticle";
import { getArticleById } from "@/app/utils/database/getTasks";
import BlogDetailPage from "@/components/common/BlogDetails";
import { PageSkeleton, createMetadata } from "@seye-bamidele/ui";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
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
  const { id } = await params;
  const dbArticle = await getArticleById(id); 
  
  if (!dbArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Article not found</p>
      </div>
    );
  }
  
  const article = transformToBlogArticle(dbArticle);
  
  return (
    <div>
      <Suspense fallback={<PageSkeleton/>}>
        <BlogDetailPage blog={article} />
      </Suspense>
    </div>
  );
}