import { getArticleById } from "@/app/utils/database/getTasks";
import BlogDetailPage from "@/components/common/BlogDetails";
import { Suspense } from "react";

export async function generateMetadata({params}:any){
  const {id} = await params;
  const article = await getArticleById(id)
  return{
    title: ` Article Details | ${article?.title}`
  }

}

export default async function SelectedBlog({params}: any) {
  const {id} = await params;
  const article = await getArticleById(id);
  
  // Handle null case
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