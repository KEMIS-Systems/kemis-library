import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
type K = {
    id?: number;
};
interface IProps<T extends FieldValues> {
    dataEdit?: T & K;
    url: string;
    submit?: boolean;
    onHide?: () => void;
    onRefreshTable?: (refreshTable: boolean) => void;
    onSubmit?: (data: T) => void;
    getFormData?: (data: FieldValues) => FieldValues | FormData;
    form: UseFormReturn<T>;
    children: React.ReactNode;
}
declare const Form: <T extends object>({ onHide, dataEdit, url, submit, onRefreshTable, onSubmit, getFormData, form, children, }: IProps<T>) => JSX.Element;
export default Form;
