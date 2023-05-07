import React, { ReactNode } from "react";
import { DialogProps } from "primereact/dialog";
import { FieldValues, UseFormReturn } from "react-hook-form";
declare type K = {
    id?: number;
};
interface IProps<T extends FieldValues> {
    dataEdit?: T & K;
    url?: string;
    onHide: () => void;
    onRefreshTable?: (refreshTable: boolean) => void;
    onSubmit?: (data: T) => void;
    getFormData?: (data: FieldValues) => FieldValues | FormData;
    form: UseFormReturn<T>;
    header: ReactNode | ((props: DialogProps) => ReactNode);
    visible: boolean;
    classNameDialog?: string;
    children: React.ReactNode;
}
declare const FormDialog: <T extends object>({ onHide, dataEdit, url, onRefreshTable, onSubmit, getFormData, form, header, visible, classNameDialog, children, }: IProps<T>) => JSX.Element;
export default FormDialog;
