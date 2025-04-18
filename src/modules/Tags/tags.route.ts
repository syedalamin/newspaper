import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TagsControllers } from './tags.controller';
import { TagsValidation } from './tags.validation';
const router = express.Router();

router.post(
  '/create-tags',
  validateRequest(TagsValidation.createTagsValidationSchema),
  TagsControllers.createTags,
);

router.get('/', TagsControllers.getAllTags);

router.get('/:id', TagsControllers.getSingleTags);

router.patch(
  '/:id',
  validateRequest(TagsValidation.updateTagsValidationSchema),
  TagsControllers.updateTags,
);

export const TagsRoutes = router;
