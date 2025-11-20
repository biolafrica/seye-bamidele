import { createCRUDHandlers } from "@/app/utils/common/crudFactory";
import { Team, TeamFormData } from "@/types/team";

const { GET, POST, PUT, DELETE } = createCRUDHandlers<TeamFormData>({
  table: "users",
  requiredFields: ["first_name", "last_name", "email", "role",],
});

export { GET, POST, PUT, DELETE };