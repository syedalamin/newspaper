import { Model } from 'mongoose';

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
  | 'publisher';

export type TUserStatus = 'active' | 'suspended' | 'in-progress';

export interface TUser {
  id: string;
  email: string;
  password?: string;
  needsPasswordChanged: boolean;
  passwordChangedAt?: Date;
  role: TRole;
  status: TUserStatus;
  isDeleted: boolean;
}

export interface IUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
