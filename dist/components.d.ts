import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode, InputHTMLAttributes, ReactElement } from 'react';
import { DialogProps } from 'primereact/dialog';
import { AxiosInstance } from 'axios';
import { Accept } from 'react-dropzone';
import { SelectItemOptionsType } from 'primereact/selectitem';
import { FieldValues, FieldPath, RegisterOptions, UseFormReturn } from 'react-hook-form';
import { InputMaskProps } from 'primereact/inputmask';
import { InputNumberProps } from 'primereact/inputnumber';
import { RadioButtonChangeEvent } from 'primereact/radiobutton';

interface IContainerElementProps {
    children: React.ReactNode;
    className?: string;
    classNameChild?: string;
}
declare const BoxElement: ({ className, classNameChild, children }: IContainerElementProps) => react_jsx_runtime.JSX.Element;

interface IButtonProps$1 {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
}
declare const Button: ({ text, type }: IButtonProps$1) => react_jsx_runtime.JSX.Element;

interface ICropImage {
    image: string;
    onChange(value?: File): void;
}
declare const CropImage: ({ image, onChange }: ICropImage) => react_jsx_runtime.JSX.Element;

interface IProps$k {
    header: ReactNode | ((props: DialogProps) => ReactNode);
    visible: boolean;
    maximizable?: boolean;
    className: string;
    footer?: ReactNode | ((props: DialogProps) => ReactNode);
    onHide: () => void;
    children: React.ReactNode;
}
declare const Dialog: ({ header, visible, maximizable, className, footer, onHide, children }: IProps$k) => react_jsx_runtime.JSX.Element;

interface P$1 {
    [key: string]: string | number | string[] | number[] | Date | Date[] | boolean | undefined;
}
interface IModalProps$3 {
    api: AxiosInstance;
    url: string;
    header: string;
    show: boolean;
    params?: P$1;
    filename?: string;
    forceDownload?: boolean;
    classNameDialog?: string;
    onHide: () => void;
}
declare const DialogFile: ({ api, url, header, show, filename, params, forceDownload, classNameDialog, onHide, }: IModalProps$3) => react_jsx_runtime.JSX.Element;

interface IDropzone {
    name?: string;
    accept?: Accept;
    maxFiles?: number;
    className?: string;
    invalid?: boolean;
    onChange?(files: File[]): void;
    openDialog?: boolean;
    style?: React.CSSProperties;
}
declare const Dropzone: ({ accept, maxFiles, className, invalid, onChange, openDialog, style, }: IDropzone) => react_jsx_runtime.JSX.Element;

interface IProps$j<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    suggestions: SelectItemOptionsType;
    value?: string;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
    disabled?: boolean;
    itemTemplate?: ReactNode | ((suggestion: any, index: number) => React.ReactNode);
    forceSelection?: boolean;
    handleSearch: (event: {
        query: string;
    }) => void;
    handleAddButton?: () => void;
}
declare const AutoComplete: <T extends object>({ className, name, label, suggestions, rules, autoFocus, form, disabled, itemTemplate, forceSelection, handleSearch, handleAddButton, }: IProps$j<T>) => react_jsx_runtime.JSX.Element;

interface IProps$i<T extends FieldValues> {
    inputId: string;
    className?: string;
    classNameLabel?: string;
    classNameCheckbox?: string;
    name: FieldPath<T>;
    label: string;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
    style?: React.CSSProperties;
    check: boolean;
    onChange(value: boolean): void;
    disabled?: boolean;
}
declare const CheckBox: <T extends object>({ inputId, className, classNameLabel, classNameCheckbox, name, label, rules, autoFocus, form, style, check, onChange, disabled, }: IProps$i<T>) => react_jsx_runtime.JSX.Element;

interface IProps$h<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    separator?: string;
    disabled?: boolean;
}
declare const Chips: <T extends object>({ className, name, label, form, rules, separator, disabled, }: IProps$h<T>) => react_jsx_runtime.JSX.Element;

interface IProps$g<T extends FieldValues> {
    name: FieldPath<T>;
    label: string;
    options: SelectItemOptionsType;
    optionLabel?: string;
    optionValue?: string;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: (option: any, index?: number) => React.ReactNode;
    valueTemplate?: React.ReactNode | JSX.Element;
    itemTemplate?: React.ReactNode | JSX.Element;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    handleAddButton?: () => void;
    disabled?: boolean;
    filter?: boolean;
}
declare const Dropdown: <T extends object>({ name, label, form, options, optionLabel, optionValue, optionGroupLabel, optionGroupChildren, optionGroupTemplate, valueTemplate, itemTemplate, rules, autoFocus, handleAddButton, disabled, filter, }: IProps$g<T>) => react_jsx_runtime.JSX.Element;

interface IProps$f<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
    disabled?: boolean;
    headerTemplate?: React.ReactNode;
}
declare const EditorHtml: <T extends object>({ className, name, label, rules, autoFocus, form, disabled, headerTemplate, }: IProps$f<T>) => react_jsx_runtime.JSX.Element;

type K$1 = {
    id?: number;
    uuid?: string;
};
interface IProps$e<T extends FieldValues> {
    api?: AxiosInstance;
    dataEdit?: T & K$1;
    url: string;
    onHide?: () => void;
    onRefreshTable?: (refreshTable: boolean, data?: T) => void;
    onSubmit?: (data: T) => void;
    getFormData?: (data: FieldValues) => FieldValues | FormData;
    form: UseFormReturn<T>;
    children: React.ReactNode;
    forwardback?: (data: Partial<T & K$1>) => unknown;
}
/**
 * Displays a form with the specified fields. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param form to control the form data
 * @param onHide (optional) callback to control what happen when you close/restart/clean the form
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param url (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 */
declare const Form: <T extends object>({ api, onHide, dataEdit, url, onRefreshTable, onSubmit, getFormData, forwardback, form, children, }: IProps$e<T>) => react_jsx_runtime.JSX.Element;

type K = {
    id?: number;
};
interface IProps$d<T extends FieldValues> {
    api?: AxiosInstance;
    dataEdit?: T & K;
    url: string;
    onHide: () => void;
    onRefreshTable?: (refreshTable: boolean, data?: T) => void;
    onSubmit?: (data: T) => void;
    getFormData?: (data: FieldValues) => FieldValues | FormData;
    form: UseFormReturn<T>;
    header: React.ReactNode;
    visible: boolean;
    maximizable?: boolean;
    classNameDialog?: string;
    children: React.ReactNode;
    forwardback?: (data: Partial<T & K>) => unknown;
    hiddenSubmitButton?: boolean;
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
 * @param url (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 * @param classNameDialog (optional) to add modal styles
 * @param hiddenSubmitButton (optional) to hide the submit button
 */
declare const FormDialog: <T extends object>({ onHide, dataEdit, api, url, onRefreshTable, onSubmit, getFormData, form, header, visible, maximizable, classNameDialog, children, forwardback, hiddenSubmitButton, }: IProps$d<T>) => react_jsx_runtime.JSX.Element;

interface IInputCellPhoneProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label: string;
    name: string;
    lang?: string;
}

declare function InputCellPhone({ form, name, lang, label, }: IInputCellPhoneProps<any>): react_jsx_runtime.JSX.Element;

interface IProps$c<T extends FieldValues> {
    name: FieldPath<T>;
    label: string;
    dateFormat?: string;
    mask?: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    disabled?: boolean;
    autoFocus?: boolean;
    className?: string;
    view?: "month" | "date" | "year";
    showTime?: boolean;
    timeOnly?: boolean;
    hourFormat?: "24" | "12";
    selectionMode?: "single" | "multiple" | "range";
    readOnlyInput?: boolean;
}
declare const InputDate: <T extends object>({ name, label, dateFormat, mask, form, rules, disabled, autoFocus, className, view, timeOnly, hourFormat, selectionMode, readOnlyInput, showTime, }: IProps$c<T>) => react_jsx_runtime.JSX.Element;

interface IProps$b<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    accept?: Accept;
    maxFiles?: number;
    handleChange?(files: File[]): void;
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
}
declare const InputFile: <T extends object>({ className, name, label, accept, maxFiles, handleChange, rules, form, }: IProps$b<T>) => react_jsx_runtime.JSX.Element;

interface IProps$a<T extends FieldValues> {
    name: FieldPath<T>;
    handleChange(files: File[]): void;
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
}
declare const InputImage: <T extends object>({ name, handleChange, rules, form }: IProps$a<T>) => react_jsx_runtime.JSX.Element;

type TInputMask = Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "readOnly" | "onFocus" | "onBlur" | "onChange" | "form"> & Omit<InputMaskProps, "form">;
interface IInputMaskProps<T extends FieldValues> extends TInputMask {
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
    label: string;
    name: string;
}
declare function InputMask({ rules, form, name, label, className, ...props }: IInputMaskProps<any>): react_jsx_runtime.JSX.Element;

interface IProps$9<T extends FieldValues> extends Partial<InputNumberProps> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    mode?: "decimal" | "currency";
    currency?: string;
    locale?: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    disabled?: boolean;
    defaultMoney?: boolean;
    iconAddButton?: string;
    handleAddButton?: () => void;
    child?: ReactElement;
}
declare const InputNumber: <T extends object>({ className, name, label, defaultMoney, mode, currency, locale, form, child, rules, disabled, iconAddButton, handleAddButton, ...rest }: IProps$9<T>) => react_jsx_runtime.JSX.Element;

interface IProps$8<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    feedback?: boolean;
    toggleMask?: boolean;
    placeholder?: string;
    disabled?: boolean;
}
declare const InputPassword: <T extends object>({ className, name, label, form, rules, autoFocus, feedback, toggleMask, placeholder, disabled, }: IProps$8<T>) => react_jsx_runtime.JSX.Element;

interface IProps$7<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    disabled?: boolean;
}
declare const InputSwitch: <T extends object>({ className, name, label, form, rules, disabled, }: IProps$7<T>) => react_jsx_runtime.JSX.Element;

interface IProps$6<T extends FieldValues> extends Partial<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onInput" | "ref" | "value" | "form">> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    type?: "text" | "email" | "number" | "password" | "date";
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
    placeholder?: string;
    disabled?: boolean;
    inputStyle?: string | null;
    child?: ReactElement;
}
declare const InputText: <T extends object>({ className, name, label, type, rules, autoFocus, form, child, placeholder, disabled, inputStyle, ...rest }: IProps$6<T>) => react_jsx_runtime.JSX.Element;

interface IProps$5<T extends FieldValues> {
    className?: string;
    classNameLabel?: string;
    name: FieldPath<T>;
    label: string;
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
    disabled?: boolean;
    autoFocus?: boolean;
    placeholder?: boolean;
}
declare const InputTextArea: <T extends object>({ className, classNameLabel, name, label, rules, form, disabled, autoFocus, placeholder, }: IProps$5<T>) => react_jsx_runtime.JSX.Element;

interface IProps$4<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    options: SelectItemOptionsType;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    multiple?: boolean;
    filter?: boolean;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: ReactNode | ((option: any, index: number) => ReactNode);
    listStyle?: React.CSSProperties;
    disabled?: boolean;
}
declare const ListBox: <T extends object>({ className, name, label, form, options, rules, optionGroupLabel, multiple, filter, optionGroupChildren, optionGroupTemplate, listStyle, disabled, }: IProps$4<T>) => react_jsx_runtime.JSX.Element;

interface IProps$3<T extends FieldValues> {
    name: FieldPath<T>;
    label: string;
    options: SelectItemOptionsType;
    optionLabel?: string;
    optionValue?: string;
    form: UseFormReturn<T>;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    handleAddButton?: (index: number) => void;
    disabled?: boolean;
    className?: string;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    itemTemplate?: ReactNode | ((option: any) => React.ReactNode);
}
declare const MultiSelect: <T extends object>({ name, label, form, options, optionLabel, optionValue, rules, autoFocus, handleAddButton, disabled, className, optionGroupLabel, optionGroupChildren, itemTemplate, }: IProps$3<T>) => react_jsx_runtime.JSX.Element;

interface IProps$2<T extends FieldValues> {
    inputId: string;
    className?: string;
    classNameLabel?: string;
    classNameComponent?: string;
    name: FieldPath<T>;
    label: string;
    value?: any;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
    style?: React.CSSProperties;
    checked?: boolean;
    onChange(event: RadioButtonChangeEvent): void;
    disabled?: boolean;
}
declare const RadioButton: <T extends object>({ inputId, className, classNameLabel, classNameComponent, name, value, label, rules, autoFocus, form, style, checked, onChange, disabled, }: IProps$2<T>) => react_jsx_runtime.JSX.Element;

interface IProps$1<T extends FieldValues> {
    name: FieldPath<T>;
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
    label: string;
    options: SelectItemOptionsType;
    disabled?: boolean;
}
declare const SelectButton: <T extends object>({ name, rules, form, label, options, disabled, }: IProps$1<T>) => react_jsx_runtime.JSX.Element;

interface ILoading {
    show?: boolean;
}
declare function Loading({ show }: ILoading): react_jsx_runtime.JSX.Element;

interface IParams$2 {
    show?: boolean;
    onHide: () => void;
    onChange(files: File[]): void;
}
declare const DialogPhoto: React.FC<IParams$2>;

interface P {
    [key: string]: string | number | string[] | number[] | Date | Date[] | boolean | undefined;
}
interface IModalProps$2 {
    api: AxiosInstance;
    url: string;
    header: string;
    params?: P;
    filename?: string;
    forceDownload?: boolean;
    onHide?: () => void;
}
declare const ShowFile: ({ api, url, header, params, filename, forceDownload, onHide }: IModalProps$2) => react_jsx_runtime.JSX.Element;

interface IButtonProps {
    type?: "button" | "submit" | "reset";
    onHandleTakeColor(value: string): void;
}
declare const ColorPalette: ({ type, onHandleTakeColor }: IButtonProps) => react_jsx_runtime.JSX.Element;

interface IModalProps$1 {
    header: string;
    show: boolean;
    onHide: () => void;
    onSubmitted: (file: File) => void;
    text: string;
    classNameDialog?: string;
    writeSignature?: boolean;
    uploadSignature?: boolean;
}
declare const DialogSignature: ({ header, show, onHide, onSubmitted, text, classNameDialog, uploadSignature, writeSignature, }: IModalProps$1) => react_jsx_runtime.JSX.Element;

interface IModalProps {
    onChange(files: File): void;
}
declare const DrawSignature: ({ onChange }: IModalProps) => react_jsx_runtime.JSX.Element;

interface ISignaturesProps {
    writeSignature?: boolean;
    uploadSignature?: boolean;
    setFileData(files: File): void;
    text?: string;
}

interface IDialogSignatureProps extends Omit<ISignaturesProps, "setFileData"> {
    header: string;
    show: boolean;
    onHide: () => void;
    onSubmitted: (file: File) => Promise<void>;
    classNameDialog?: string;
}

interface IInPageSignatureProps extends Omit<ISignaturesProps, "setFileData"> {
    onSubmitted: (file: File) => void;
    className?: string;
}

declare const Signatures: {
    Dialog: (args: IDialogSignatureProps) => react_jsx_runtime.JSX.Element;
    InPage: (args: IInPageSignatureProps) => react_jsx_runtime.JSX.Element;
};

interface IParams$1 {
    onChange(files: File): void;
}
declare const UploadSignature: React.FC<IParams$1>;

interface IProps {
    onChange(files: File): void;
    text: string;
    writeSignature?: boolean;
}
declare const WriteSignature: ({ onChange, text, writeSignature }: IProps) => react_jsx_runtime.JSX.Element;

interface IParams {
    onChange(file: File): void;
}
declare const UploadPhoto: React.FC<IParams>;

interface ISplitButtonProps extends React.ButtonHTMLAttributes<any> {
    dropListItems: React.JSX.Element;
    dropListIcon?: React.JSX.Element;
    dropListClassName?: string;
    buttonLabelClassName?: string;
    buttonName: string;
}

/**
 *
 *
 * @param buttonName {String} - The unique name to button
 * @param dropListItems  {Element} - Some element, not is necessary a div or ul, just a <></> (Fragment) and your elements items
 * @param dropListClassName {String} - Tailwind class of your prefer
 * @param buttonLabelClassName {String} - Tailwind class of your prefer
 * @param dropListIcon {Element} - Some element to apply a exclusive icon
 * @returns
 */
declare function SplitButton(props: ISplitButtonProps): react_jsx_runtime.JSX.Element;

export { AutoComplete, BoxElement, Button, CheckBox, Chips, ColorPalette, CropImage, Dialog, DialogFile, DialogPhoto, DialogSignature, DrawSignature, Dropdown, Dropzone, EditorHtml, Form, FormDialog, InputCellPhone, InputDate, InputFile, InputImage, InputMask, InputNumber, InputPassword, InputSwitch, InputText, InputTextArea, ListBox, Loading, MultiSelect, RadioButton, SelectButton, ShowFile, Signatures, SplitButton, UploadPhoto, UploadSignature, WriteSignature };
