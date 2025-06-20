import { Where } from '~/utils/interfaces/where';
import { OrderBy } from '~/utils/interfaces/order-by';
import { Include } from '~/utils/interfaces/include';
import { Select } from '~/utils/interfaces/select';

export interface PrismaRequest {
  where?: Where;
  page?: number;
  elementsPerPage?: number;
  orderBy?: OrderBy[];
  include?: Include;
  select?: Select;
  skip?: number;
  take?: number;
}
