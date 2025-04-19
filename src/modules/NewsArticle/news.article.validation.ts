import { z } from 'zod';
import { NewsPublishedStatus } from './news.article.constant';

const tagsValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const createNewsArticleValidationSchema = z.object({
  body: z.object({
    journalist: z.string({
      invalid_type_error: 'journalist must be string',
    }),
    category: z.string({
      invalid_type_error: 'category must be string',
    }),
    title: z.string({
      invalid_type_error: 'title must be string',
    }),
    content: z.string({
      invalid_type_error: 'content must be string',
    }),
    summary: z.string({
      invalid_type_error: 'summary must be string',
    }),
    featuredImage: z.string({
      invalid_type_error: 'featuredImage must be string',
    }),
    breakingNews: z.boolean().optional(),
    isPublished: z
      .enum([...NewsPublishedStatus] as [string, ...string[]])
      .optional(),
    tags: z.array(tagsValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateNewsArticleValidationSchema = z.object({
  body: z.object({
    journalist: z.string().optional(),
    category: z.string().optional(),
    title: z.string().optional(),
    content: z.string().optional(),
    summary: z.string().optional(),
    featuredImage: z.string().optional(),
    breakingNews: z.boolean().optional(),
    isPublished: z
      .enum([...NewsPublishedStatus] as [string, ...string[]])
      .optional(),
    tags: z.array(tagsValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const NewsArticleValidation = {
  createNewsArticleValidationSchema,
  updateNewsArticleValidationSchema,
};
