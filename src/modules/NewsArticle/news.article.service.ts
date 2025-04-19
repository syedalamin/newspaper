import { TNewsArticle } from './news.article.interface';
import { NewsArticle } from './news.article.model';

const createNewsArticle = async (payload: TNewsArticle) => {
  const result = await NewsArticle.create(payload);
  return result;
};

const getAllNewsArticle = async () => {
  const result = await NewsArticle.find();
  return result;
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
};
