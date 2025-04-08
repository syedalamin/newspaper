import { model, Schema } from 'mongoose';
import { TPosition } from './position.interface';

const positionSchema = new Schema<TPosition>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Position = model<TPosition>('Position', positionSchema);
