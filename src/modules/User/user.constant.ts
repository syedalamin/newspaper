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

export const User_Role = {
  superAdmin: 'superAdmin',
  admin:'admin',
  editor :'editor',
  reporter :'reporter',
  photography:'photography',
  design :'design',
  it:'it',
  marketer :'marketer',
  hr :'hr',
  finance:'finance',
  publisher :'publisher',
} as const;

export const UserStatus: TUserStatus[] = ['active', 'in-progress', 'suspended'];
