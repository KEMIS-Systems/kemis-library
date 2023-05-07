import React, { ReactNode } from "react";
import { DialogProps } from "primereact/dialog";
interface IProps {
    header: ReactNode | ((props: DialogProps) => ReactNode);
    visible: boolean;
    className: string;
    footer?: ReactNode | ((props: DialogProps) => ReactNode);
    onHide: () => void;
    children: React.ReactNode;
}
declare const Dialog: ({ header, visible, className, footer, onHide, children, }: IProps) => JSX.Element;
export default Dialog;
