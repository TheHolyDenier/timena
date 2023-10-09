import { Include } from '~/utils/interfaces/include';

export interface Select {
  [key: string]: true | Select;
  include?: Include;
}
