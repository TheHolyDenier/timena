import { CellType } from '~/utils/types/cell.type';
import { RouteLocationRaw } from 'vue-router';

export interface CellDefinition<T = unknown> {
  name: string;
  title?: string;
  field: string | ((entity: T) => string);
  to?: string | ((entity: T) => string | RouteLocationRaw);
  type?: CellType;
}
