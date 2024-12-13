import { Migration } from './migration.model';
import { TaskTable } from './task.model';

export interface Database {
  tasks: TaskTable;
  migrations: Migration;
}
