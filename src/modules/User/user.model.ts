import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { Role, UserStatus } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

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

// pre hook middleware
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds),
  );
  next()
});

// set after saving password 
userSchema.post('save', function(doc, next){
  doc.password = ''
  next()
})

export const UserModel = model<TUser>('User', userSchema);
