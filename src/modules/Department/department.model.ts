import { model, Schema } from 'mongoose';
import { TDepartment, TPosition } from './department.interface';

const positionSchema = new Schema<TPosition>(
  {
    name: {
      type: Schema.Types.ObjectId,
      ref: 'Position',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    positions: [positionSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Department = model<TDepartment>('Department', departmentSchema);
