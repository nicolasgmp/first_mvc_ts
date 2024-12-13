import { doesNotMatch } from 'assert';

export type CreateTaskDto = {
  title: string;
  description: string;
};

export type UpdateTaskDto = {
  title?: string;
  description?: string;
  done?: boolean;
};

export type ShowTaskDto = {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
};

export type TaskDto = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
};
