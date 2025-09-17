import { ISignaturesProps } from "../types";

export interface IDialogSignatureProps  extends Omit<ISignaturesProps, 'setFileData'> {
    header: string;
    show: boolean;
    onHide: () => void;
    onSubmitted: (file: File) => Promise<void>
    classNameDialog?: string;    
}