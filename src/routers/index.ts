import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { PositionRoutes } from '../modules/Position/position.route';
import { DepartmentRoutes } from '../modules/Department/department.route';
import { ShiftRoutes } from '../modules/Seasonal_Data/seasonal.date.route';
import { PublisherRoutes } from '../modules/Publisher/publisher.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { TagsRoutes } from '../modules/Tags/tags.route';
import { NewsArticleRoutes } from '../modules/NewsArticle/news.article.route';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/tags',
    route: TagsRoutes,
  },
  {
    path: '/news',
    route: NewsArticleRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
