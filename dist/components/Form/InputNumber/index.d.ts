/// <reference types="react" />
import { FieldValues, RegisterOptions, FieldPath, UseFormReturn } from "react-hook-form";
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    mode?: "decimal" | "currency";
    currency?: string;
    locale?: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
}
declare const InputNumber: <T extends object>({ className, name, label, mode, currency, locale, form, rules, }: IProps<T>) => JSX.Element;
export default InputNumber;
