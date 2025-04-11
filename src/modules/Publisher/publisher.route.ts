import express from 'express';
import { PublisherControllers } from './publisher.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import jsonDataParse from '../../middlewares/jsonDataParse';
import validateRequest from '../../middlewares/validateRequest';
import { PublisherValidations } from './publisher.validation';

const router = express.Router();

router.get('/', PublisherControllers.getPublisher);
router.get('/:id', PublisherControllers.getSinglePublisher);
router.patch(
  '/:id',
  upload.single('file'),
  jsonDataParse,
  validateRequest(PublisherValidations.updatePublisherValidationSchema),
  PublisherControllers.updatePublisher,
);
router.delete('/:id', PublisherControllers.deletePublisher);

export const PublisherRoutes = router;
