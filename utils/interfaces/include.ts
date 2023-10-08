import { Select } from '~/utils/interfaces/select';

export interface Include {
  [key: string]: true | Include;
  select?: Select;
}
