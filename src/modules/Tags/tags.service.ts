import { TTags } from './tags.interface';
import { Tags } from './tags.model';

const createTags = async (payload: TTags) => {
  const result = await Tags.create(payload);
  return result;
};

const getAllTags = async () => {
  const result = await Tags.find();
  return result;
};

const getSingleTags = async (id: string) => {
  const result = await Tags.findById(id);
  return result;
};

const updateTags = async (id: string, payload: Partial<TTags>) => {
  const result = await Tags.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const TagsServices = {
  createTags,
  getAllTags,
  getSingleTags,
  updateTags,
};
