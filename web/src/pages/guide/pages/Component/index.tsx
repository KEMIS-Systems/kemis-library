// Sub Pages
import { DialogFile } from "./DialogFile";
import type { IDialogFileProps } from "./DialogFile/types";
import { Signature } from "./Signature";
import type { ISignatureProps } from "./Signature/types";

export const Component = {
    DialogFile: (args: IDialogFileProps) => <DialogFile {...args} />,
    DrawSignature: (args: ISignatureProps) => <Signature {...args} />,
}