import { InputType } from '~/utils/types/input.type';

export interface InputDefinition {
  name: string;

  label?: string;

  type?: InputType;
}
