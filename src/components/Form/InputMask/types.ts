import { InputMaskProps } from "primereact/inputmask";
import { InputHTMLAttributes } from "react";
import { FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";

export type TInputMask = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "disabled" | "readOnly" | "onFocus" | "onBlur" | "onChange" | "form"
> &
  Omit<InputMaskProps, "form">;

export interface IInputMaskProps<T extends FieldValues> extends TInputMask {
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
  label: string;
  name: string;
}
