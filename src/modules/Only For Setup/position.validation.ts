import { z } from 'zod';

const createPositionValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Position must be string',
    }),
  }),
});
const updatePositionValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Position must be string',
    }),
  }),
});

export const positionValidation = {
  createPositionValidationSchema,
  updatePositionValidationSchema,
};
