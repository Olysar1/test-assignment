import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  FormGeneratorErrors,
  IFormGeneratorValues,
  Props,
} from "./FormGenerator.types";
import { transformFormGeneratorFields } from "../../utils/transformFormGeneratorFields";
import { useFormFields } from "../../context/FormFieldsContext/FormFieldsContext";
import { formSchema } from "./FormGenerator.schema";
import { ValidationError } from "yup";
import { toCamelCase } from "../../utils/toCamelCase";

const formDefaultValues: IFormGeneratorValues = {
  inputType: "text",
  inputLabel: "",
  selectFieldOptions: [],
  hasConditionalLogic: false,
  relativeElementLabel: "",
  valueToTrack: "",
};

const FormGenerator: FC<Props> = ({ inputTypeOptions }) => {
  const [errors, setErrors] = useState<FormGeneratorErrors>({});
  const [formValues, setFormValues] = useState(formDefaultValues);
  const [newOption, setNewOption] = useState("");
  const { formFields, formKeys, setFormFields } = useFormFields();

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    try {
      if (type === "checkbox")
        await formSchema.validateAt(name, { ...formValues, [name]: checked });
      else await formSchema.validateAt(name, { ...formValues, [name]: value });

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      }
    }
  };

  const handleAddOption = () => {
    if (
      newOption.trim() === "" ||
      formValues.selectFieldOptions?.some((val) => val === newOption) //prevent duplicates
    ) {
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      ...(prev.selectFieldOptions && {
        selectFieldOptions: [...prev.selectFieldOptions, newOption],
      }), //here we could use uuid to generate unique ID for each option
    }));
    setNewOption("");
  };

  const handleRemoveOption = (option: string | undefined) => {
    setFormValues((prev) => ({
      ...prev,
      selectFieldOptions: prev.selectFieldOptions?.filter(
        (val) => option !== val
      ),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validFormData = await formSchema.validate(formValues, {
        abortEarly: false,
      });

      const cleanFormFieldObject = transformFormGeneratorFields(validFormData);

      if (formKeys.includes(toCamelCase(cleanFormFieldObject.inputLabel))) {
        setErrors({ inputLabel: "Cannot have two fields with the same name" });
        throw new Error();
      }

      if (
        cleanFormFieldObject.relativeElementLabel &&
        !formKeys.includes(
          toCamelCase(cleanFormFieldObject.relativeElementLabel)
        )
      ) {
        setErrors({
          relativeElementLabel: "There is no generated field with this name",
        });
        throw new Error();
      }

      setFormFields((prev) => [...prev, cleanFormFieldObject]);
      setFormValues(formDefaultValues);
      setErrors({});
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const formattedErrors: Record<string, string> = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="w-1/2 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-thin">Form Generator</h1>
      <form
        className="flex flex-col items-start gap-3 w-full"
        onSubmit={handleSubmit}
      >
        <div className="form-field-layout">
          <label
            htmlFor="inputType"
            className={`input-label-base ${
              errors.inputType ? "input-label-error" : ""
            }`}
          >
            Select input type
          </label>
          <select
            name="inputType"
            value={formValues.inputType}
            onChange={handleChange}
            className={`input-base ${errors.inputType ? "input-error" : ""}`}
          >
            {inputTypeOptions.map((option) => {
              return <option key={option}>{option}</option>;
            })}
          </select>
          {errors.inputType && (
            <span className="error-text">{errors.inputType}</span>
          )}
        </div>
        {formValues.inputType === "select" && (
          <div className="form-field-layout form-field-outline">
            <label
              htmlFor="selectFieldOptions"
              className={`input-label-secondary ${
                errors.selectFieldOptions ? "input-label-error" : ""
              }`}
            >
              Input select field options
            </label>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              className={`input-base mb-2 ${
                errors.selectFieldOptions ? "input-error" : ""
              }`}
            />
            {errors.selectFieldOptions && (
              <span className="error-text">{errors.selectFieldOptions}</span>
            )}
            {formValues.selectFieldOptions &&
              formValues.selectFieldOptions.length > 0 && (
                <ul className="form-field-outline flex flex-col gap-1 mb-2 text-slate-500">
                  {formValues.selectFieldOptions.map((fieldOption) => (
                    <li
                      key={fieldOption}
                      className="border border-slate-200 py-1 px-2 rounded-xl flex items-center justify-between"
                    >
                      <span className="error-text">{fieldOption}</span>
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
          <label
            htmlFor="inputLabel"
            className={`input-label-base ${
              errors.inputLabel ? "input-label-error" : ""
            }`}
          >
            Input field label
          </label>
          <input
            type="text"
            name="inputLabel"
            value={formValues.inputLabel}
            onChange={handleChange}
            className={`input-base ${errors.inputLabel ? "input-error" : ""}`}
          />
          {errors.inputLabel && (
            <span className="error-text">{errors.inputLabel}</span>
          )}
        </div>
        {formFields.length > 0 && (
          <div className="form-field-layout">
            <label
              htmlFor="hasConditionalLogic"
              className={`input-label-base ${
                errors.hasConditionalLogic ? "input-label-error" : ""
              }`}
            >
              Has conditional logic
            </label>
            <input
              type="checkbox"
              name="hasConditionalLogic"
              checked={formValues.hasConditionalLogic}
              onChange={handleChange}
              className={`input-base ${
                errors.hasConditionalLogic ? "input-error" : ""
              }`}
            />
            {errors.hasConditionalLogic && (
              <span className="error-text">{errors.hasConditionalLogic}</span>
            )}
          </div>
        )}
        {formValues.hasConditionalLogic && (
          <div className="form-field-outline">
            <div className="form-field-layout">
              <label
                htmlFor="relativeElementLabel"
                className={`input-label-base ${
                  errors.relativeElementLabel ? "input-label-error" : ""
                }`}
              >
                Relative element label
              </label>
              <input
                type="text"
                name="relativeElementLabel"
                value={formValues.relativeElementLabel}
                onChange={handleChange}
                className={`input-base ${
                  errors.relativeElementLabel ? "input-error" : ""
                }`}
              />
              {errors.relativeElementLabel && (
                <span className="error-text">
                  {errors.relativeElementLabel}
                </span>
              )}
            </div>
            <div className="form-field-layout">
              <label
                htmlFor="valueToTrack"
                className={`input-label-base ${
                  errors.valueToTrack ? "input-label-error" : ""
                }`}
              >
                Value to track
              </label>
              <input
                type="text"
                name="valueToTrack"
                value={formValues.valueToTrack}
                onChange={handleChange}
                className={`input-base ${
                  errors.valueToTrack ? "input-error" : ""
                }`}
              />
              {errors.valueToTrack && (
                <span className="error-text">{errors.valueToTrack}</span>
              )}
            </div>
          </div>
        )}
        <button className="btn-primary">+ Add Field</button>
      </form>
    </div>
  );
};

export default FormGenerator;
