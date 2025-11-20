export interface Team {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface TeamFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}