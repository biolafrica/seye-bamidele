import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import { Article } from "@/types/articles";

const { GET, POST, PUT, DELETE } = createCRUDHandlers<Article>({
  table: "Articles",
  requiredFields: ["title", "content", "excerpt", "image", "images"],
});

export { GET, POST, PUT, DELETE };
