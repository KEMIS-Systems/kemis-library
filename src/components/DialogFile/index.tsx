import React, { useCallback } from "react";
import { Dialog } from "primereact/dialog";

import { AxiosInstance } from "axios";
import ShowFile from "../ShowFile";

interface P {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface IModalProps {
  api: AxiosInstance;
  url: string;
  header: string;
  show: boolean;
  params?: P;
  onHide: () => void;
}

const DialogFile = ({ api, url, header, show, onHide }: IModalProps) => {
  const handleHide = useCallback(() => {
    onHide();
  }, [onHide]);

  return (
    <>
      <Dialog
        header={header}
        visible={show}
        onHide={handleHide}
        className="w-full lg:w-4/5 min-h-full max-h-full"
        maximizable
      >
        <ShowFile api={api} header={header} url={url} />
      </Dialog>
    </>
  );
};

export default DialogFile;
