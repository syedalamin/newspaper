import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Category must be string',
    }),
    description: z.string({
      invalid_type_error: 'Category Description must be string',
    }),
  }),
});
const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Category must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Category Description must be string',
      })
      .optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
