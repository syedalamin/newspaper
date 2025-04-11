
export type TRole =
  | 'superAdmin'
  | 'admin'
  | 'editor'
  | 'reporter'
  | 'photography'
  | 'design'
  | 'it'
  | 'marketer'
  | 'hr'
  | 'finance'
  | 'publisher'

  export type TUserStatus = 'active' | 'suspended' | 'in-progress';

export interface TUser {
  id: string;
  email: string;
  password?: string;
  needsPasswordChanged: boolean;
  role: TRole;
  status: TUserStatus ;
  isDeleted: boolean;
}
