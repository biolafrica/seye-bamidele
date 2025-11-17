import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import { Article } from "@/types/articles";

const { GET, POST, PUT, DELETE } = createCRUDHandlers<Article>({
  table: "Events",
  requiredFields: ["title", "event", "description", "link", "category", "type"],
});

export { GET, POST, PUT, DELETE };