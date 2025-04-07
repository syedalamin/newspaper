import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

const adminValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test, {
      message: 'Middle Name must start with a capital letter',
    })
    .optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter ',
    }),
});

const guardianSchema = z.object({
  fatherName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'Father Name must  start with a capital letter ',
    }),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'Father Name must  start with a capital letter ',
    }),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      name: adminValidationSchema,
      bio: z.string().optional(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      guardian: guardianSchema,
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      experience: z.string(),
      isFreelancer: z.boolean().optional(),
    }),
  }),
});

const updateAdminNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test, {
      message: 'Middle Name must start with a capital letter',
    })
    .optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter ',
    })
    .optional(),
});

const updateGuardianSchema = z.object({
  fatherName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'Father Name must  start with a capital letter ',
    })
    .optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'Father Name must  start with a capital letter ',
    })
    .optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      name: updateAdminNameValidationSchema.optional(),
      bio: z.string().optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      guardian: updateGuardianSchema.optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      experience: z.string().optional(),
      isFreelancer: z.boolean().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema
};
