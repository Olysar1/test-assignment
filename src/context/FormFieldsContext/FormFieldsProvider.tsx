import { ReactNode, useState } from "react";
import { IFormValues } from "../../components/FormGeneratorComponent/FormGenerator.types";
import { FormFieldsContext } from "./FormFieldsContext";

export const FormFieldsProvider = ({ children }: { children: ReactNode }) => {
  const [formFields, setFormFields] = useState<IFormValues[]>([]);

  return (
    <FormFieldsContext.Provider value={{ formFields, setFormFields }}>
      {children}
    </FormFieldsContext.Provider>
  );
};
