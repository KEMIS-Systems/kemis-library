import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { AxiosInstance } from "axios";
type K = {
    id?: number;
};
interface IProps<T extends FieldValues> {
    api?: AxiosInstance;
    dataEdit?: T & K;
    path?: string;
    submit?: boolean;
    onHide?: () => void;
    onRefreshTable?: (refreshTable: boolean) => void;
    onSubmit?: (data: T) => void;
    getFormData?: (data: FieldValues) => FieldValues | FormData;
    form: UseFormReturn<T>;
    children: React.ReactNode;
}
/**
 * Displays a form with the specified fields. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param form to control the form data
 * @param onHide (optional) callback to control what happen when you close/restart/clean the form
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param path (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 */
declare const Form: <T extends object>({ api, onHide, dataEdit, path, submit, onRefreshTable, onSubmit, getFormData, form, children, }: IProps<T>) => React.JSX.Element;
export default Form;
