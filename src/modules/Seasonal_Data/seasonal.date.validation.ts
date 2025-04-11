import { z } from 'zod';
import { Month, ShiftCode, ShiftName } from './seasonal.data.constant';

const createSeasonalDateValidationSchema = z.object({
  body: z.object({
    name: z.enum([...ShiftName] as [string, ...string[]]),
    code: z.enum([...ShiftCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
});
const updateSeasonalDateValidationSchema = z.object({
  body: z.object({
    name: z.enum([...ShiftName] as [string, ...string[]]).optional(),
    code: z.enum([...ShiftCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...Month] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Month] as [string, ...string[]]).optional(),
  }),
});

export const positionValidation = {
  createSeasonalDateValidationSchema,
  updateSeasonalDateValidationSchema,
};
