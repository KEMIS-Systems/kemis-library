/// <reference types="react" />
import { RegisterOptions, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
interface IProps<T extends FieldValues> {
    className?: string;
    classNameLabel?: string;
    classNameInput?: string;
    name: FieldPath<T>;
    label: string;
    type?: 'text' | 'email' | 'number' | 'password' | 'date';
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
    placeholder?: string;
}
declare const InputText: <T extends object>({ className, classNameLabel, classNameInput, name, label, type, rules, autoFocus, form, placeholder, }: IProps<T>) => JSX.Element;
export default InputText;
