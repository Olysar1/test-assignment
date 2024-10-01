export type Stringify<T> = {
  [K in keyof T]: string;
};

export type Props = {
  inputTypeOptions: string[];
};

export interface IFormGeneratorValues {
  inputType: string;
  inputLabel: string;
  selectFieldOptions: string[];
  hasConditionalLogic: boolean;
  relativeElementLabel: string;
  valueToTrack: string;
}

export type FormGeneratorErrors = Partial<Stringify<IFormGeneratorValues>>;
