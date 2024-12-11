import { Generated } from 'kysely';

export interface Migration {
  id: Generated<number>;
  name: string
  executedAt: Date
}
