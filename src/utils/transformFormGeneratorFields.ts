import { IFormValues } from "../components/FormGeneratorComponent/FormGenerator.types";

export const transformFormGeneratorFields = (
  formValues: IFormValues
): IFormValues => {
  return {
    ...formValues,
    ...(formValues.inputType === "select"
      ? { selectFieldOptions: formValues.selectFieldOptions }
      : { selectFieldOptions: [] }),
  };
};
