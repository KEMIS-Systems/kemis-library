/// <reference types="react" />
import { FieldValues, RegisterOptions, FieldPath, UseFormReturn } from "react-hook-form";
import { InputMaskCompleteEvent } from "primereact/inputmask";
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    mask: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    onComplete?: (e: InputMaskCompleteEvent) => void;
}
declare const InputMask: <T extends object>({ className, name, label, mask, form, rules, autoFocus, onComplete, }: IProps<T>) => JSX.Element;
export default InputMask;
