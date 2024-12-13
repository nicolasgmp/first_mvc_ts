import { CreateTaskDto, ShowTaskDto, TaskDto, UpdateTaskDto } from '../models/dtos/task.dto';
import { QueryOptions } from '../utils/request.util';

export interface TaskRepository {
  create(newTask: CreateTaskDto): Promise<void>;
  findAll(where?: QueryOptions): Promise<ShowTaskDto[]>;
  remove(id: string): Promise<void>;
  update(id: string, toUpdate: UpdateTaskDto): Promise<void>;
  findById(id: string): Promise<TaskDto | undefined>;
  complete(id: string): Promise<void>;
}
