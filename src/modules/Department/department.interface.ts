import { Types } from 'mongoose';

export type TPosition = {
    name: Types.ObjectId,
    isDeleted: boolean
}

export type TDepartment = {
  name: string;
  isDeleted?: boolean;
  position: [TPosition];
};
