/// <reference types="react" />
import { RegisterOptions, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
}
declare const EditorHtml: <T extends object>({ className, name, label, rules, autoFocus, form, }: IProps<T>) => JSX.Element;
export default EditorHtml;
