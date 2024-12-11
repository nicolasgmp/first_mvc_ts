import { Request, Response } from 'express';

class TaskController {
  show(req: Request, res: Response) {
    res.render('tasks/all');
  }

  create(req: Request, res: Response) {
    res.render('tasks/create');
  }
}

export default new TaskController();
