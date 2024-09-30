import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useFormFields } from "../../context/FormFieldsContext/FormFieldsContext";
import { toCamelCase } from "../../utils/toCamelCase";
import { IGeneratedFormValues } from "./GeneratedForm.types";

const GeneratedForm = () => {
  const { formFields } = useFormFields();
  const [formValues, setFormValues] = useState<IGeneratedFormValues>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredObject: { [key: string]: string | boolean } = {};

    if (formRef.current) {
      const formElements: HTMLFormControlsCollection = formRef.current.elements;
      const allowedKeys = Object.keys(formValues).filter((key) =>
        Array.from(formElements).some((element) => {
          const formControl = element as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement;
          return formControl.name === key;
        })
      );

      for (const key in formValues) {
        if (allowedKeys.includes(key)) {
          filteredObject[key] = formValues[key];
        }
      }
    }

    console.log(filteredObject);
  };

  return (
    <div className="w-1/2 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-thin">Generated Form</h1>
      {formFields.length > 0 && (
        <form
          className="flex flex-col items-start gap-3 w-full"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {formFields.map((field, index) => {
            const fieldName = toCamelCase(field.inputLabel);
            const relativeElementValue =
              formValues[toCamelCase(field.relativeElementLabel)];

            if (
              field.hasConditionalLogic &&
              (field.valueToTrack === "true" || field.valueToTrack === "false"
                ? Boolean(field.valueToTrack)
                : field.valueToTrack) !== relativeElementValue
            )
              return;

            return (
              <div key={index} className="form-field-layout">
                <label htmlFor={fieldName} className="input-label-base">
                  {field.inputLabel}
                </label>
                {field.inputType === "select" ? (
                  <select
                    name={fieldName}
                    value={(formValues[fieldName] || "") as string}
                    onChange={handleChange}
                    className="input-base"
                  >
                    {field.selectFieldOptions.map((option) => {
                      return <option key={option}>{option}</option>;
                    })}
                  </select>
                ) : (
                  <input
                    type={field.inputType}
                    name={fieldName}
                    {...(field.inputType === "checkbox"
                      ? { checked: (formValues[fieldName] || false) as boolean }
                      : { value: (formValues[fieldName] || "") as string })}
                    onChange={handleChange}
                    className="input-base"
                  />
                )}
              </div>
            );
          })}
          <button className="btn-primary">Submit</button>
        </form>
      )}
    </div>
  );
};

export default GeneratedForm;
