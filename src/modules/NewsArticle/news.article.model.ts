import { model, Schema } from 'mongoose';
import { TNewsArticle, TNewsTags } from './news.article.interface';
import { NewsPublishedStatus } from './news.article.constant';

const tagsSchema = new Schema<TNewsTags>(
  {
    name: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const newsArticleSchema = new Schema<TNewsArticle>(
  {
    journalist: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      required: true,
      trim: true,
    },
    breakingNews: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: String,
      enum: NewsPublishedStatus,
      default: 'Published',
    },
    tags: [tagsSchema],
  },
  {
    timestamps: true,
  },
);

export const NewsArticle = model<TNewsArticle>(
  'NewsArticle',
  newsArticleSchema,
);
