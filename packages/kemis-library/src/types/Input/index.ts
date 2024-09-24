import { RefAttributes } from "react";
import { FieldPath, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";

export interface IInputProps extends Partial<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>,"onInput" | 'form' | 'ref'>> {
  label: string;
  name: FieldPath<FieldValues>;
  rules: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  form: UseFormReturn<FieldValues>;
  ref: RefAttributes<any>;
  inputStyle?: string;
  labelStyle?: string;
}