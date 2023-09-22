import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';

export const useForm = () => {
  const validate = async (
    value: string | boolean | number,
    inputDefinition: InputDefinitionInterface
  ): Promise<true | string> => {
    if (inputDefinition.required && (!value || value === '')) {
      return `${inputDefinition.label} is required`;
    }

    for (const validation of inputDefinition.validations || []) {
      const result = await validation(value);
      if (result !== true) {
        return String(result);
      }
    }

    return true;
  };

  return { validate };
};
