import React from 'react';
import { FieldValues, RegisterOptions, FieldPath, UseFormReturn } from 'react-hook-form';
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    dateFormat?: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
}
declare const InputDate: <T extends object>({ className, name, label, dateFormat, form, rules, }: IProps<T>) => React.JSX.Element;
export default InputDate;
