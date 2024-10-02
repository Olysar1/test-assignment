import { IFormGeneratorValues } from "../components/FormGeneratorComponent/FormGenerator.types";
import { toCamelCase } from "./toCamelCase";

interface INoGeneratedFieldArguments {
  generatedFormKeys: string[];
  formGeneratorValues: IFormGeneratorValues;
}

export const noGeneratedField = ({
  generatedFormKeys,
  formGeneratorValues,
}: INoGeneratedFieldArguments): boolean => {
  return Boolean(
    formGeneratorValues.relativeElementLabel &&
      !generatedFormKeys.includes(
        toCamelCase(formGeneratorValues.relativeElementLabel)
      )
  );
};
