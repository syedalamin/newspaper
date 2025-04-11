import { z } from 'zod';
import { BloodGroup, Gender } from './publisher.constant';

const nameValidationSchema = z.object({
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
    .refine(value => /^[A-Z]/.test(value), {
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

const createPublisherValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    publisher: z.object({
      name: nameValidationSchema,
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
      department: z.string(),
      seasonalDate: z.string(),
      isFreelancer: z.boolean().optional(),
    }),
  }),
});

const updateNameValidationSchema = z.object({
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
    .refine(value => /^[A-Z]/.test(value), {
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

const updatePublisherValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    publisher: z.object({
      name: updateNameValidationSchema.optional(),
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

export const PublisherValidations = {
  createPublisherValidationSchema,
  updatePublisherValidationSchema,
};
