import { getArticleById } from "@/app/utils/database/getTasks";
import BlogDetailPage from "@/components/common/BlogDetails";
import { createMetadata } from "@seye-bamidele/ui";
import { Suspense } from "react";

export async function generateMetadata({params}:any){
  const {id} = await params;
  const article = await getArticleById(id)

  return createMetadata({
    title: article?.title,
    description: article?.excerpt,
  });

}

export default async function SelectedBlog({params}: any) {
  const {id} = await params;
  const article = await getArticleById(id);
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Article not found</p>
      </div>
    );
  }
  
  return(
    <div>
      <Suspense fallback={<p>loading article...</p>}>
        <BlogDetailPage blog={article} />
      </Suspense>
    </div>
  );
}