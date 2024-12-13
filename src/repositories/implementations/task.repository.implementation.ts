import { title } from 'process';
import { db } from '../../db/conn';
import { CreateTaskDto, ShowTaskDto, TaskDto, UpdateTaskDto } from '../../models/dtos/task.dto';
import { QueryOptions } from '../../utils/request.util';
import { TaskRepository } from '../task.repository';

export class TaskRepositoryImpl implements TaskRepository {
  private constructor() {}

  public static build() {
    return new TaskRepositoryImpl();
  }

  async create(newTask: CreateTaskDto): Promise<void> {
    const toSave: TaskDto = {
      id: crypto.randomUUID().toString(),
      title: newTask.title,
      description: newTask.description,
      done: false,
      createdAt: new Date(),
    };

    await db.insertInto('tasks').values(toSave).executeTakeFirstOrThrow();
  }

  async findAll(queryOptions?: QueryOptions): Promise<TaskDto[]> {
    const { done } = queryOptions?.where || {};
    let query = db.selectFrom('tasks').selectAll();

    if (done) {
      query = query.where('done', '=', done);
    }

    const tasks = await query.execute();

    const result = tasks.map((t) => {
      return {
        id: t.id as string,
        title: t.title,
        description: t.description,
        done: t.done as boolean,
        createdAt: t.createdAt as Date,
      };
    });

    return result;
  }

  async remove(id: string): Promise<void> {
    await db.deleteFrom('tasks').where('id', '=', id).execute();
  }

  async update(id: string, toUpdate: UpdateTaskDto): Promise<void | undefined> {
    await db
      .updateTable('tasks')
      .set({
        title: toUpdate.title,
        description: toUpdate.description,
      })
      .where('id', '=', id)
      .execute();
  }

  async findById(id: string): Promise<TaskDto | undefined> {
    const found = await db.selectFrom('tasks').selectAll().where('id', '=', id).executeTakeFirst();

    if (found) {
      const result = {
        id: found.id,
        title: found.title,
        description: found.description,
        done: found.done,
        createdAt: found.createdAt,
      };
      return result as TaskDto;
    }

    return undefined;
  }

  async complete(id: string): Promise<void> {
    const found = await this.findById(id);

    if (found) {
      found.done = true;

      await db
        .updateTable('tasks')
        .set({
          done: found.done,
        })
        .where('id', '=', id)
        .execute();
    }
  }
}
