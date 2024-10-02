import { IFormGeneratorValues } from "../components/FormGeneratorComponent/FormGenerator.types";
import { toCamelCase } from "./toCamelCase";

interface IisDuplicateKeyArguments {
  generatedFormKeys: string[];
  formGeneratorValues: IFormGeneratorValues;
}

export const isDuplicateKey = ({
  generatedFormKeys,
  formGeneratorValues,
}: IisDuplicateKeyArguments): boolean => {
  return generatedFormKeys.includes(
    toCamelCase(formGeneratorValues.inputLabel)
  );
};
