import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { PositionRoutes } from '../modules/Position/position.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
