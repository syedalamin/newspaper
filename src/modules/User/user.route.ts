import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../Admin/admin.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import jsonDataParse from '../../middlewares/jsonDataParse';
import { PublisherValidations } from '../Publisher/publisher.validation';
const router = Router();

router.post(
  '/create-admin',
  upload.single('file'),
  jsonDataParse,
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/create-publisher',
  upload.single('file'),
  jsonDataParse,
  validateRequest(PublisherValidations.createPublisherValidationSchema),
  UserControllers.createPublisher,
);

export const UserRoutes = router;
