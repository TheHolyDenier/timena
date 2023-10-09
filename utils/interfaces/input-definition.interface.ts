import { InputType } from '~/utils/types/input.type';
import { OptionDefinition } from '~/utils/interfaces/option-definition.interface';

export interface InputDefinition {
  name: string;

  label?: string;

  type?: InputType;

  required?: boolean;

  isMultiple?: boolean;

  optionLoader?: (inputValue?: string) => Promise<OptionDefinition[]>;

  pattern?: string;
}
