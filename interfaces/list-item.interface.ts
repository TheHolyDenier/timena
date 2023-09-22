import { RouteLocationRaw } from 'vue-router';
import { IconType } from '~/types/icon.type';

export interface ListItemInterface {
  name: string;
  title: string;
  subtitle?: string;
  to?: RouteLocationRaw;
  leadingIcon?: IconType;
  trailingIcon?: IconType;
  nameClass?: string;
}
