import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import { ArticleBase } from "@seye-bamidele/shared-types";

const { GET, POST, PUT, DELETE } = createCRUDHandlers<ArticleBase>({
  table: "articles",
  requiredFields: ["title", "content", "excerpt", "image", "images"],
});

export { GET, POST, PUT, DELETE };
