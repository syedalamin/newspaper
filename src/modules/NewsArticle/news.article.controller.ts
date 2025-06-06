import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NewsArticleServices } from './news.article.service';

const createNewsArticle = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await NewsArticleServices.createNewsArticle(userId, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'NewsArticle is created successfully',
    data: result,
  });
});
const getAllNewsArticle = catchAsync(async (req, res) => {
  const result = await NewsArticleServices.getAllNewsArticle(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'NewsArticle are retrieved successfully',
    data: result,
  });
});

const getMyAllNewsArticle = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await NewsArticleServices.getMyAllNewsArticle(userId,req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'My NewsArticle are retrieved successfully',
    data: result,
  });
});

const getSingleNewsArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NewsArticleServices.getSingleNewsArticle(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'NewsArticle is retrieved successfully',
    data: result,
  });
});
const updateNewsArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NewsArticleServices.updateNewsArticle(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'NewsArticle is update successfully',
    data: result,
  });
});

export const NewsArticleControllers = {
  createNewsArticle,
  getAllNewsArticle,
  getSingleNewsArticle,
  updateNewsArticle,
  getMyAllNewsArticle
};
