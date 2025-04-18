import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async () => {
  const result = await Category.find();
  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategory = async (id: string, payload: Partial<TCategory>) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const CategoryServices = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
};
