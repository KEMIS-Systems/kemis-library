import React, { ReactNode } from "react";
import { DialogProps } from "primereact/dialog";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { AxiosInstance } from "axios";
type K = {
    id?: number;
};
interface IProps<T extends FieldValues> {
    api?: AxiosInstance;
    dataEdit?: T & K;
    form: UseFormReturn<T>;
    url: string;
    header: ReactNode | ((props: DialogProps) => ReactNode);
    onHide: () => void;
    visible: boolean;
    children: React.ReactNode;
    onSubmit?: (data: T) => void;
    onRefreshTable?: (refreshTable: boolean) => void;
    getFormData?: (data: FieldValues) => FieldValues | FormData;
    classNameDialog?: string;
}
/**
 * Displays a form with the specified fields within a modal window. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param header modal header/title
 * @param form to control the form data
 * @param onHide callback to control what happen when you close the modal window
 * @param visible boolean to control the Modal visibility
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param path (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 * @param classNameDialog (optional) to add modal styles
 */
declare const FormDialog: <T extends object>({ api, onHide, dataEdit, url, onRefreshTable, onSubmit, getFormData, form, header, visible, classNameDialog, children, }: IProps<T>) => React.JSX.Element;
export default FormDialog;
