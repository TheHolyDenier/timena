import { WhereCondition } from '~/utils/interfaces/where-condition';

export interface Where {
  [key: string]: string;
  AND?: WhereCondition[];
  OR?: WhereCondition[];
  NOT?: WhereCondition[];
}
