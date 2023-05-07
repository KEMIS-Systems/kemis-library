import React from "react";
import { Accept } from "react-dropzone";
interface IDropzone {
    name?: string;
    accept?: Accept;
    maxFiles?: number;
    className?: string;
    invalid?: boolean;
    onChange?(files: File[]): void;
}
declare const Dropzone: ({ accept, maxFiles, invalid, onChange }: IDropzone) => React.JSX.Element;
export default Dropzone;
