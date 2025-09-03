// Sub Pages
import { DialogFile } from "./DialogFile";
import type { IDialogFileProps } from "./DialogFile/types";

export const Component = {
    DialogFile: (args: IDialogFileProps) => <DialogFile {...args} />,
}