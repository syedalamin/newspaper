import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { NewsArticleControllers } from './news.article.controller';
import { NewsArticleValidation } from './news.article.validation';
const router = express.Router();

router.post(
  '/create-news',
  validateRequest(NewsArticleValidation.createNewsArticleValidationSchema),
  NewsArticleControllers.createNewsArticle,
);

router.get('/', NewsArticleControllers.getAllNewsArticle);

router.get('/:id', NewsArticleControllers.getSingleNewsArticle);

router.patch(
  '/:id',
  validateRequest(NewsArticleValidation.updateNewsArticleValidationSchema),
  NewsArticleControllers.updateNewsArticle,
);

export const NewsArticleRoutes = router;
