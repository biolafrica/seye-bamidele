export interface Team {
  id: number;
  name: string;
  email: string;
  dateRegistered: string;
}

type Role = 'admin' | 'editor' | 'viewer'| '';

export interface TeamFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}