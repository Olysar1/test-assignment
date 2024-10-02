import * as yup from "yup";

export const formSchema = yup.object().shape({
  inputType: yup.string().required("Input type is required"),
  inputLabel: yup
    .string()
    .required("Input field label is required")
    .min(1, "Label cannot be an empty string"),
  hasConditionalLogic: yup.boolean(),
  relativeElementLabel: yup.string().test({
    name: "test for relativeElementLabel",
    message: "Relative element label is required",
    test: (val, { parent: { hasConditionalLogic } }) => {
      if (hasConditionalLogic && !val) return false;
      return true;
    },
  }),
  valueToTrack: yup.string().test({
    name: "test for valueToTrack",
    message: "Relative element value is required",
    test: (val, { parent: { hasConditionalLogic } }) => {
      if (hasConditionalLogic && !val) return false;
      return true;
    },
  }),
  selectFieldOptions: yup
    .array()
    .of(yup.string())
    .test({
      name: "test for select",
      message: "at leaset 1 option is required",
      test: (val, { parent: { inputType } }) => {
        if (inputType === "select" && val?.length === 0) return false;
        return true;
      },
    }),
});
