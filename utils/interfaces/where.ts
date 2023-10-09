import { WhereCondition } from '~/utils/interfaces/where-condition';

export interface Where {
  AND?: WhereCondition[];
  OR?: WhereCondition[];
  NOT?: WhereCondition[];
}
