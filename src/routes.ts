import { Router } from 'express';
import taskController from './controllers/task.controller';

const router = Router();

const createRoute = (path: string) => {
  const newRouter = Router();
  router.use(path, newRouter);
  return newRouter;
};

const tasksRouter = createRoute('/v1/tasks');
tasksRouter.get('/create', taskController.create);
tasksRouter.get('/', taskController.show);

export default router;
