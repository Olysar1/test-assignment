import { inputTypes } from "../../common/types/types";
import { FormGenerator } from "../../components/FormGeneratorComponent";
import { GeneratedForm } from "../../components/GeneratedFormComponent";

const options: inputTypes[] = [
  inputTypes.Text,
  inputTypes.Checkbox,
  inputTypes.Select,
];

const FormGeneratorPage = () => {
  return (
    <>
      <FormGenerator inputTypeOptions={options} />
      <GeneratedForm />
    </>
  );
};

export default FormGeneratorPage;
