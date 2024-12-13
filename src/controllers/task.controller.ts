import { Request, Response } from 'express';
import { TaskRepositoryImpl } from '../repositories/implementations/task.repository.implementation';
import { QueryOptions } from '../utils/request.util';
import { TaskRepository } from '../repositories/task.repository';

class TaskController {
  async show(req: Request, res: Response) {
    const repository: TaskRepository = TaskRepositoryImpl.build();
    const { done } = req.query;
    const query: QueryOptions = {
      where: { done },
    };
    const tasks = await repository.findAll(query);
    res.render('tasks/all', { tasks });
  }

  async showOne(req: Request, res: Response) {
    const repository: TaskRepository = TaskRepositoryImpl.build();

    const { id } = req.params;

    const task = await repository.findById(id);

    res.render('tasks/one', { task });
  }

  getCreateForm(req: Request, res: Response) {
    res.render('tasks/create');
  }

  async create(req: Request, res: Response): Promise<void> {
    const repository: TaskRepository = TaskRepositoryImpl.build();

    const { title, description } = req.body;

    await repository.create({ title, description });

    res.redirect('/v1/tasks');
  }

  async remove(req: Request, res: Response) {
    const { id } = req.body;
    const repository: TaskRepository = TaskRepositoryImpl.build();

    await repository.remove(id);

    res.redirect('/v1/tasks');
  }

  async getUpdateForm(req: Request, res: Response) {
    const { id } = req.params;
    const repository: TaskRepository = TaskRepositoryImpl.build();

    const task = await repository.findById(id);

    res.render('tasks/edit', { task });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;

    const repository: TaskRepository = TaskRepositoryImpl.build();

    await repository.update(id, { title, description });

    res.redirect('/v1/tasks');
  }

  async complete(req: Request, res: Response) {
    const { id } = req.params;

    const repository: TaskRepository = TaskRepositoryImpl.build();

    await repository.complete(id);

    res.redirect('/v1/tasks');
  }
}

export default new TaskController();
