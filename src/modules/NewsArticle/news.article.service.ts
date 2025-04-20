import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import { TNewsArticle } from './news.article.interface';
import { NewsArticle } from './news.article.model';
import { Category } from '../Category/category.model';

const createNewsArticle = async (userId: string, payload: TNewsArticle) => {
  const { category, ...remainingData } = payload;
  const user = await UserModel.findOne({ id: userId });

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'User is not authorize');
  }
  const isDeleted = user.isDeleted;

  if (isDeleted) {
    throw new AppError(status.UNAUTHORIZED, 'User is not authorize ');
  }

  // Todo
  // const isSuspend = user.status;

  // if (isSuspend === 'in-progress' || isSuspend === 'suspended') {
  //   throw new AppError(status.UNAUTHORIZED, 'User is not authorize ');
  // }

  const categoryData = await Category.findOne({ _id: category });

  if (!categoryData) {
    throw new AppError(status.BAD_REQUEST, 'Category is not found');
  }

  const modifyData = {
    ...remainingData,
    journalist: user._id,
    category: categoryData._id,
  };

  const result = await NewsArticle.create(modifyData);
  return result;
};

const getAllNewsArticle = async (query: Record<string, unknown>) => {
  const newsQuery = new QueryBuilder(
    NewsArticle.find().populate('journalist category tags.name'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await newsQuery.countTotal();
  const result = await newsQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getMyAllNewsArticle = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const user = await UserModel.findOne({ id: userId });

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'User is not authorize');
  }
  const isDeleted = user.isDeleted;

  if (isDeleted) {
    throw new AppError(status.UNAUTHORIZED, 'User is not authorize ');
  }

  const newsQuery = new QueryBuilder(
    NewsArticle.find({ journalist: user._id }).populate(
      'journalist category tags.name',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await newsQuery.countTotal();
  const result = await newsQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleNewsArticle = async (id: string) => {
  const result = await NewsArticle.findById(id);
  return result;
};

const updateNewsArticle = async (
  id: string,
  payload: Partial<TNewsArticle>,
) => {
  const result = await NewsArticle.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const NewsArticleServices = {
  createNewsArticle,
  getAllNewsArticle,
  getSingleNewsArticle,
  updateNewsArticle,
  getMyAllNewsArticle,
};
