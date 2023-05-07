import React, { ReactNode } from "react";
import { FieldValues, RegisterOptions, FieldPath, UseFormReturn } from "react-hook-form";
import { SelectItemOptionsType } from "primereact/selectitem";
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    options: SelectItemOptionsType;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    multiple?: boolean;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: ReactNode | ((option: any, index: number) => ReactNode);
    listStyle?: React.CSSProperties;
}
declare const ListBox: <T extends object>({ className, name, label, form, options, rules, optionGroupLabel, multiple, optionGroupChildren, optionGroupTemplate, listStyle, }: IProps<T>) => JSX.Element;
export default ListBox;
