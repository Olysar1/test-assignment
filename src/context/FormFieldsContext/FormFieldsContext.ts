import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IFormGeneratorValues } from "../../components/FormGeneratorComponent/FormGenerator.types";

export const FormFieldsContext = createContext<{
  formFields: IFormGeneratorValues[];
  setFormFields: Dispatch<SetStateAction<IFormGeneratorValues[]>>;
}>({ formFields: [], setFormFields: () => {} });

export const useFormFields = () => useContext(FormFieldsContext);
