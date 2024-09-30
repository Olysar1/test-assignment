import { IFormGeneratorValues } from "../components/FormGeneratorComponent/FormGenerator.types";

export const transformFormGeneratorFields = (
  formValues: IFormGeneratorValues
): IFormGeneratorValues => {
  return {
    ...formValues,
    ...(formValues.inputType === "select"
      ? { selectFieldOptions: formValues.selectFieldOptions }
      : { selectFieldOptions: [] }),
  };
};
