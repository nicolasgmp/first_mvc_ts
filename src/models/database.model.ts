import { Migration } from './migration.model';
import { Task } from './task.model';

export interface Database {
  tasks: Task;
  migrations: Migration;
}
