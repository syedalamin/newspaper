import { TRole, TUserStatus } from './user.interface';

export const Role: TRole[] = [
  'superAdmin',
  'admin',
  'editor',
  'reporter',
  'photography',
  'design',
  'it',
  'marketer',
  'hr',
  'finance',
  'publisher',
];

export const UserStatus: TUserStatus[] = ['active', 'in-progress', 'suspended'];
