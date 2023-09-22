import { RouteLocationRaw } from 'vue-router';
import { IconType } from '~/types/icon.type';

export interface NavigationInterface {
  name: string;
  label?: string;
  icon?: IconType;
  getTo?: () => RouteLocationRaw;
}
