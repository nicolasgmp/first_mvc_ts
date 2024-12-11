import { UUID } from 'crypto';
import { Generated } from 'kysely';

export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
}
