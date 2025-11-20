import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import { Event } from "@/types/events";

const { GET, POST, PUT, DELETE } = createCRUDHandlers<Event>({
  table: "Events",
  requiredFields: ["title", "event", "description", "link", "category", "type"],
});

export { GET, POST, PUT, DELETE };