import express from 'express';
import { PositionControllers } from './position.controller';
import validateRequest from '../../middlewares/validateRequest';
import { positionValidation } from './position.validation';
const router = express.Router();

router.post(
  '/create-position',
  validateRequest(positionValidation.createPositionValidationSchema),
  PositionControllers.createPosition,
);

router.get('/', PositionControllers.getAllPosition);

router.get('/:id', PositionControllers.getSinglePosition);

router.patch(
  '/:id',
  validateRequest(positionValidation.updatePositionValidationSchema),
  PositionControllers.updatePosition,
);

export const PositionRoutes = router;
