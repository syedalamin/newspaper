import { z } from 'zod';

const PositionValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const createDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department must be string',
    }),
    positions: z.array(PositionValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department must be string',
      })
      .optional(),
    positions: z.array(PositionValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const DepartmentValidation = {
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
};
