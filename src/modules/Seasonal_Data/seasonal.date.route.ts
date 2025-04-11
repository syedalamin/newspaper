import express from 'express';
import { ShiftControllers } from './seasonal.date.controller';
const router = express.Router();

router.post('/create-shift', ShiftControllers.createShift);

router.get('/', ShiftControllers.getAllShift);

router.get('/:id', ShiftControllers.getSingleShift);

router.patch('/:id', ShiftControllers.updateShift);

export const ShiftRoutes = router;
