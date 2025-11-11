import { transformArticles } from "@/app/utils/common/transformArticle";
import { getArticles } from "@/app/utils/database/getTasks";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function HomeBlog() {
  const dbArticles = await getArticles();
  const allArticles = transformArticles(dbArticles);
  const articles = allArticles.slice(0, 3);

  return(
    <div className="lg:col-span-3 space-y-5 mr-24 mb-20">
      {articles.map((item, idx) => (

        <div key={idx} className="rounded-xl mt-3 w-full mb-9 md:hover:bg-hover md:cursor-pointer md:p-6 md:3/4 md:mt-0">
          
          <h2 className="text-sm text-secondary border-l border-border pl-2">
            {item.date}
          </h2>
          
          <h2 className="text-base font-semibold text-heading mt-3">
            {item.title}
          </h2>
      
          <p className="mt-2 text-secondary text-sm leading-relaxed">
            {item.excerpt }
          </p>

          <Link
            href="#"
            className="mt-3 inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors group text-sm"
          >
            Read article
            <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>

      ))}
    </div>


  )
}