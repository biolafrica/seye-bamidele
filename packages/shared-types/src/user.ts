export interface TeamBase{
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  updated_at: string;
}


export type TeamData = Omit<TeamBase, 'updated_at'>
export type TeamSidePanelData = Omit<TeamBase, 'created_at' | 'updated_at'>
export type TeamFormData = Omit<TeamBase, 'created_at' | 'updated_at' | 'id'>
export type TeamTable = Omit<TeamBase, 'id' | 'updated_at'>
export type TeamUser = Pick<TeamBase, 'email'> &{
  password:string
}