import { ReactNode, useState } from "react";
import { IFormGeneratorValues } from "../../components/FormGeneratorComponent/FormGenerator.types";
import { FormFieldsContext } from "./FormFieldsContext";
import { toCamelCase } from "../../utils/toCamelCase";

export const FormFieldsProvider = ({ children }: { children: ReactNode }) => {
  const [formFields, setFormFields] = useState<IFormGeneratorValues[]>([]);
  const formLabels = formFields.map((field) => field.inputLabel);
  const formKeys = formLabels.map((label) => toCamelCase(label));

  return (
    <FormFieldsContext.Provider value={{ formFields, formKeys, formLabels, setFormFields }}>
      {children}
    </FormFieldsContext.Provider>
  );
};
