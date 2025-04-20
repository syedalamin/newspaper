import { Types } from 'mongoose';

export type TPublishedStatus = 'Draft' | 'Published' | 'Archived';

export type TNewsTags = {
  name: Types.ObjectId;
  isDeleted: boolean;
};

export type TNewsArticle = {
  journalist: Types.ObjectId;
  category: Types.ObjectId;
  title: string;
  content: string;
  summary: string;
  featuredImage: string;
  breakingNews: boolean;
  isDeleted: boolean;
  isPublished: TPublishedStatus;
  tags?: [TNewsTags];
};
