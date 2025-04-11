import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { PositionRoutes } from '../modules/Position/position.route';
import { DepartmentRoutes } from '../modules/Department/department.route';
import { ShiftRoutes } from '../modules/Seasonal_Data/seasonal.date.route';
import { PublisherRoutes } from '../modules/Publisher/publisher.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/positions',
    route: PositionRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
  {
    path: '/shifts',
    route: ShiftRoutes,
  },
  {
    path: '/publishers',
    route: PublisherRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
