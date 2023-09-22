import { OptionInterface } from '~/interfaces/option.interface';

export interface InputDefinitionInterface {
  name: string;
  label: string;
  type?: 'text' | 'password' | 'checkbox' | 'textarea' | 'select';
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hint?: string;
  options?: OptionInterface[];
  validations?: ((
    inputValue: string | boolean | number
  ) => Promise<boolean | string>)[];
}
