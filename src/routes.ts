import { Router } from 'express';
import taskController from './controllers/task.controller';

const router = Router();

const createRoute = (path: string) => {
  const newRouter = Router();
  router.use(path, newRouter);
  return newRouter;
};

const tasksRouter = createRoute('/v1/tasks');
tasksRouter.get('/create', taskController.getCreateForm);
tasksRouter.post('/create', taskController.create);
tasksRouter.post('/remove', taskController.remove);
tasksRouter.get('/edit/:id', taskController.getUpdateForm);
tasksRouter.post('/edit/:id', taskController.update);
tasksRouter.get('/', taskController.show);
tasksRouter.get('/one/:id', taskController.showOne);
tasksRouter.post('/complete/:id', taskController.complete);

export default router;
