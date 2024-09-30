import { ChangeEvent, FC, FormEvent, useState } from "react";
import { IFormGeneratorValues, Props } from "./FormGenerator.types";
import { transformFormGeneratorFields } from "../../utils/transformFormGeneratorFields";
import { useFormFields } from "../../context/FormFieldsContext/FormFieldsContext";

const formDefaultValues: IFormGeneratorValues = {
  inputType: "text",
  inputLabel: "",
  selectFieldOptions: [],
};

const FormGenerator: FC<Props> = ({ inputTypeOptions }) => {
  const [formValues, setFormValues] = useState(formDefaultValues);
  const [newOption, setNewOption] = useState("");
  const { setFormFields } = useFormFields();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setNewOption("");
  };

  const handleAddOption = () => {
    if (
      newOption.trim() === "" ||
      formValues.selectFieldOptions.some((val) => val === newOption) //prevent duplicates
    ) {
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      selectFieldOptions: [...prev.selectFieldOptions, newOption], //here we could use uuid to generate unique ID for each option
    }));
    setNewOption("");
  };

  const handleRemoveOption = (option: string) => {
    setFormValues((prev) => ({
      ...prev,
      selectFieldOptions: prev.selectFieldOptions.filter(
        (val) => option !== val
      ),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanFormFieldObject = transformFormGeneratorFields(formValues);

    setFormFields((prev) => [...prev, cleanFormFieldObject]);
    setFormValues(formDefaultValues);
  };

  return (
    <div className="w-1/2 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-thin">Form Generator</h1>
      <form
        className="flex flex-col items-start gap-3 w-full"
        onSubmit={handleSubmit}
      >
        <div className="form-field-layout">
          <label htmlFor="inputType" className="input-label-base">
            Select input type
          </label>
          <select
            name="inputType"
            value={formValues.inputType}
            onChange={handleChange}
            className="input-base"
          >
            {inputTypeOptions.map((option) => {
              return <option key={option}>{option}</option>;
            })}
          </select>
        </div>
        {formValues.inputType === "select" && (
          <div className="form-field-layout form-field-outline">
            <label
              htmlFor="selectFieldOptions"
              className="input-label-secondary"
            >
              Input select field options
            </label>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className="input-base mb-2"
            />
            {formValues.selectFieldOptions.length > 0 && (
              <ul className="form-field-outline flex flex-col gap-1 mb-2 text-slate-500">
                {formValues.selectFieldOptions.map((fieldOption) => (
                  <li
                    key={fieldOption}
                    className="border border-slate-200 py-1 px-2 rounded-xl flex items-center justify-between"
                  >
                    <span>{fieldOption}</span>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveOption(fieldOption);
                      }}
                    >
                      Remove option
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddOption();
              }}
              className="btn-secondary"
            >
              + Add Option
            </button>
          </div>
        )}
        <div className="form-field-layout">
          <label htmlFor="inputLabel" className="input-label-base">
            Input field label
          </label>
          <input
            type="text"
            name="inputLabel"
            value={formValues.inputLabel}
            onChange={handleChange}
            className="input-base"
          />
        </div>
        <button className="btn-primary">+ Add Field</button>
      </form>
    </div>
  );
};

export default FormGenerator;
