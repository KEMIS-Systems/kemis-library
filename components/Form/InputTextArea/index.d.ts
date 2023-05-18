import React from 'react';
import { RegisterOptions, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
interface IProps<T extends FieldValues> {
    className?: string;
    classNameLabel?: string;
    name: FieldPath<T>;
    label: string;
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
}
declare const InputTextArea: <T extends object>({ className, classNameLabel, name, label, rules, form, }: IProps<T>) => React.JSX.Element;
export default InputTextArea;
