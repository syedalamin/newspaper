import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { NewsArticleControllers } from './news.article.controller';
import { NewsArticleValidation } from './news.article.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../User/user.constant';
const router = express.Router();

router.post(
  '/create-news',
  auth(User_Role.admin),
  validateRequest(NewsArticleValidation.createNewsArticleValidationSchema),
  NewsArticleControllers.createNewsArticle,
);

router.get('/', NewsArticleControllers.getAllNewsArticle);
router.get(
  '/my-post',
  auth(User_Role.admin),
  NewsArticleControllers.getMyAllNewsArticle,
);

router.get('/:id', NewsArticleControllers.getSingleNewsArticle);

router.patch(
  '/:id',
  validateRequest(NewsArticleValidation.updateNewsArticleValidationSchema),
  NewsArticleControllers.updateNewsArticle,
);

export const NewsArticleRoutes = router;
