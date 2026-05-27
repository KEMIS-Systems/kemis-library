import { FieldValues, UseFormReturn } from "react-hook-form";

export interface IInputCellPhoneProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: string;
  lang?: string; // WILL WORK ONLY IF THE 'i18N' WAS TRUE
}
