import { WhereCondition } from '~/utils/interfaces/where-condition';

export interface Where {
  [key: string]: unknown;
  AND?: WhereCondition[];
  OR?: WhereCondition[];
  NOT?: WhereCondition[];
}
