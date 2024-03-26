import React, { ReactNode } from "react";
import { Dialog as DialogPrime, DialogProps } from "primereact/dialog";

interface IProps {
  header: ReactNode | ((props: DialogProps) => ReactNode);
  visible: boolean;
  maximizable: boolean;
  className: string;
  footer?: ReactNode | ((props: DialogProps) => ReactNode);
  onHide: () => void;
  children: React.ReactNode;
}

const Dialog = ({
  header,
  visible,
  maximizable,
  className,
  footer,
  onHide,
  children,
}: IProps) => {
  return (
    <DialogPrime
      header={header}
      visible={visible}
      maximizable={maximizable}
      onHide={onHide}
      className={className}
      footer={footer}
    >
      {children}
    </DialogPrime>
  );
};

export default Dialog;
