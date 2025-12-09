import { getPaginatedArticles } from "@/app/utils/database/getTasks";
import { transformArticles } from "@/app/utils/common/transformArticle";
import PageSectionPaginated from "../sections/PageSectionWithPagination";

export default async function ArticleDynamic() {
  const page = 1;
  const limit = 10;

  const { data, hasMore } = await getPaginatedArticles(page, limit);
  const transformed = transformArticles(data);

  return (
    <PageSectionPaginated
      initialItems={transformed}
      initialHasMore={hasMore}
      variant="articles"
      fetchMore={async (page) => {
        "use server";
        const result = await getPaginatedArticles(page, limit);
        return {
          data: transformArticles(result.data),
          hasMore: result.hasMore
        };
      }}
    />
  );
}
