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
