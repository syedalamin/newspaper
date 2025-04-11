import { model, Schema } from 'mongoose';
import { TShift } from './seasonal.date.interface';
import { Month, ShiftCode, ShiftName } from './seasonal.data.constant';

const shiftSchema = new Schema<TShift>(
  {
    name: {
      type: String,
      required: true,
      enum: ShiftName,
    },
    code: {
      type: String,
      required: true,
      enum: ShiftCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Month,
    },
  },
  {
    timestamps: true,
  },
);

export const Shift = model<TShift>('Shift', shiftSchema);
