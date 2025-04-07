import express, { NextFunction, Request, Response } from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from './admin.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import jsonDataParse from '../../middlewares/jsonDataParse';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:id', AdminControllers.getSingleAdmin);
router.patch(
  '/:id',
  upload.single('file'),
  jsonDataParse,
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:id', AdminControllers.deleteAdmin);
export const AdminRoutes = router;
