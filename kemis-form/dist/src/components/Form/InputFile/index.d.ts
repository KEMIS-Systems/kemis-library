/// <reference types="react" />
import { RegisterOptions, FieldValues, FieldPath, UseFormReturn } from "react-hook-form";
import { Accept } from "react-dropzone";
interface IProps<T extends FieldValues> {
    className?: string;
    name: FieldPath<T>;
    accept?: Accept;
    maxFiles?: number;
    handleChange?(files: File[]): void;
    rules?: RegisterOptions;
    form: UseFormReturn<T>;
}
declare const InputFile: <T extends object>({ className, name, accept, maxFiles, handleChange, rules, form, }: IProps<T>) => JSX.Element;
export default InputFile;
