import { DialogSignature } from "./Partials/Dialog";
import type { IDialogSignatureProps } from "./Partials/Dialog/types";
import { InPageSignature } from "./Partials/InPage";
import type { IInPageSignatureProps } from "./Partials/InPage/types";

const Signatures = {
  Dialog: (args: IDialogSignatureProps) => <DialogSignature {...args} />,
  InPage: (args: IInPageSignatureProps) => <InPageSignature {...args} />,
};

export default Signatures;
