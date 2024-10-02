import { inputTypes } from "../../common/types/types";

export type Stringify<T> = {
  [K in keyof T]: string;
};

export type Props = {
  inputTypeOptions: inputTypes[];
};

export interface IFormGeneratorValues {
  inputType: string;
  inputLabel: string;
  selectFieldOptions?: (string | undefined)[] | undefined;
  hasConditionalLogic?: boolean | undefined;
  relativeElementLabel?: string | undefined;
  valueToTrack?: string | undefined;
}

export type FormGeneratorErrors = Partial<Stringify<IFormGeneratorValues>>;
