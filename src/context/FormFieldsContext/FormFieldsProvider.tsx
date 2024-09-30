import { ReactNode, useState } from "react";
import { IFormGeneratorValues } from "../../components/FormGeneratorComponent/FormGenerator.types";
import { FormFieldsContext } from "./FormFieldsContext";

export const FormFieldsProvider = ({ children }: { children: ReactNode }) => {
  const [formFields, setFormFields] = useState<IFormGeneratorValues[]>([]);

  return (
    <FormFieldsContext.Provider value={{ formFields, setFormFields }}>
      {children}
    </FormFieldsContext.Provider>
  );
};
