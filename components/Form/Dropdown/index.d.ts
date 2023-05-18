import React from 'react';
import { FieldValues, RegisterOptions, FieldPath, UseFormReturn } from 'react-hook-form';
import { SelectItemOptionsType } from 'primereact/selectitem';
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    options: SelectItemOptionsType;
    selected?: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    handleAddButton?: (index: number) => void;
    disabled?: boolean;
}
declare const Dropdown: <T extends object>({ className, name, label, form, options, selected, rules, autoFocus, handleAddButton, disabled, }: IProps<T>) => React.JSX.Element;
export default Dropdown;
