import { model, Schema } from 'mongoose';
import { TTags } from './tags.interface';

const TagsSchema = new Schema<TTags>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Tags = model<TTags>('Tag', TagsSchema);
