import PageHeader from "@/components/common/PageHeader";
import PageSection from "@/components/common/PageSection";
import { getArticles } from "../utils/database/getTasks";
import { transformArticles } from "../utils/common/transformArticle";


export default async function Articles() {
  const article = await getArticles();
  const articles = transformArticles(article);

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl space-y-14">
        <PageHeader
          title="Writing on software design, company building, and the aerospace industry."
          description="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
        <PageSection items={articles} variant="articles" />
      </div>
    </main>
  );
}



