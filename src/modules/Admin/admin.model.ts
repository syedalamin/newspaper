import { model, Schema } from 'mongoose';
import { TAdmin, TGuardian, TUserName } from './admin.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last Name is required'],
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
  },
  { timestamps: false, _id: false },
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      trim: true,
      required: [true, 'Father Name is required'],
    },
    fatherOccupation: {
      type: String,
      trim: true,
      required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
      type: String,
      required: [true, 'Father Contact No is required'],
    },
    motherName: {
      type: String,
      required: [true, 'Mother Name is required'],
    },
    motherOccupation: {
      type: String,
      required: [true, 'Mother occupation is required'],
    },
    motherContactNo: {
      type: String,
      required: [true, 'Mother Contact No is required'],
    },
  },
  { timestamps: false, _id: false },
);

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      // unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      // unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImage: { type: String, default: '' },
    experience: {
      type: String,
      required: [true, 'Experiences is required'],
    },
    isFreelancer: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<TAdmin>('Admin', adminSchema);
