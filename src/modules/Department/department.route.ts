import express from 'express';
import { DepartmentControllers } from './department.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './department.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.createDepartmentValidationSchema),
  DepartmentControllers.createDepartment,
);

router.get('/', DepartmentControllers.getAllDepartment);

router.get('/:id', DepartmentControllers.getSingleDepartment);

router.patch('/id', DepartmentControllers.updateDepartment);

export const DepartmentRoutes = router;
