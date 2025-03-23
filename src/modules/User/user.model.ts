import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { Role, UserStatus } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
    },
    needsPasswordChanged: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: Role,
      required: [true, 'Role is required'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = model<TUser>('User', userSchema);
