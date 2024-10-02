import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IFormGeneratorValues } from "../../components/FormGeneratorComponent/FormGenerator.types";

export const FormFieldsContext = createContext<{
  formFields: IFormGeneratorValues[];
  formKeys: string[];
  formLabels: string[];
  setFormFields: Dispatch<SetStateAction<IFormGeneratorValues[]>>;
}>({ formFields: [], formKeys: [], formLabels: [], setFormFields: () => {} });

export const useFormFields = () => useContext(FormFieldsContext);
