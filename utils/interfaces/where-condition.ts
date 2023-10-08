import { FilterOperator } from '~/utils/enums/filter-operator';
import { Where } from '~/utils/interfaces/where';

export interface WhereCondition extends Where {
  field?: string;
  value?: string | string[] | number;
  operator?: FilterOperator;
}
