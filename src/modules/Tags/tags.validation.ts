import { z } from 'zod';

const createTagsValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Tags must be string',
    }),
  }),
});
const updateTagsValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Tags must be string',
    }),
  }),
});

export const TagsValidation = {
  createTagsValidationSchema,
  updateTagsValidationSchema,
};
