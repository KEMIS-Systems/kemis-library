/// <reference types="react" />
import { RegisterOptions, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
import { SelectItemOptionsType } from 'primereact/selectitem';
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    label: string;
    suggestions: SelectItemOptionsType;
    handleSearch: (event: {
        query: string;
    }) => void;
    rules?: RegisterOptions;
    autoFocus?: boolean;
    form: UseFormReturn<T>;
}
declare const AutoComplete: <T extends object>({ className, name, label, suggestions, handleSearch, rules, autoFocus, form, }: IProps<T>) => JSX.Element;
export default AutoComplete;
