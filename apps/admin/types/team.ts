export interface Team {
  id?: string ; 
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at?: string;
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