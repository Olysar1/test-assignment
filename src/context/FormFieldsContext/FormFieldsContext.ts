import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { IFormValues } from "../../components/FormGeneratorComponent/FormGenerator.types";

export const FormFieldsContext = createContext<{
  formFields: IFormValues[];
  setFormFields: Dispatch<SetStateAction<IFormValues[]>>;
}>({ formFields: [], setFormFields: () => {} });

export const useFormFields = () => useContext(FormFieldsContext);
