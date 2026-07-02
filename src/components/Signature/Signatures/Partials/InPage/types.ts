import { ISignaturesProps } from "../types";

export interface IInPageSignatureProps extends Omit<ISignaturesProps, "setFileData"> {
  onSubmitted: (file: File) => void;
  className?: string;
}
