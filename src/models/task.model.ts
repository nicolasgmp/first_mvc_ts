import { UUID } from 'crypto';
import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface TaskTable {
  id?: string;
  title: string;
  description: string;
  done?: boolean;
  createdAt?: Date;
}
