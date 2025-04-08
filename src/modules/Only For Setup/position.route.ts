import express from 'express'
import { PositionControllers } from './position.controller'
const router = express.Router()

router.post('/create-position', PositionControllers.createPosition)

router.get('/', PositionControllers.createPosition)

router.get('/:id', PositionControllers.createPosition)

router.patch('/id', PositionControllers.createPosition)



export const PositionRoutes = router