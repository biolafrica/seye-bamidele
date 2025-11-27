export interface Team {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface TeamFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export interface BackendUserData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  id : string;
  temp_password?: string;
}