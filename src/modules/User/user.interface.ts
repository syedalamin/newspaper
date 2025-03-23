export interface TUser {
  id: string,
  email: string;
  password?: string;
  needsPasswordChanged: boolean;
  role: 'superAdmin' | 'admin' | 'journalist' | 'reader';
  status: 'active' | 'suspended' | "in-progress";
  isDeleted: boolean;
}
