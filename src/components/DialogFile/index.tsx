import React, { useCallback } from "react";
import { Dialog } from "primereact/dialog";

import { AxiosInstance } from "axios";
import ShowFile from "../ShowFile";

interface P {
  [key: string]: string | number | string[] | number[] | Date | Date[] | boolean | undefined;
}

interface IModalProps {
  api: AxiosInstance;
  url: string;
  header: string;
  show: boolean;
  params?: P;
  filename?: string;
  forceDownload?: boolean;
  classNameDialog?: string;
  onHide: () => void;
}

const DialogFile = ({
  api,
  url,
  header,
  show,
  filename,
  params,
  forceDownload,
  classNameDialog,
  onHide,
}: IModalProps) => {
  const handleHide = useCallback(() => {
    onHide();
  }, [onHide]);

  return (
    <Dialog
      header={header}
      visible={show}
      onHide={handleHide}
      className={classNameDialog ?? "w-full lg:w-4/5 min-h-full max-h-full"}
      maximizable
    >
      <ShowFile
        api={api}
        header={header}
        url={url}
        filename={filename}
        onHide={handleHide}
        params={params}
        forceDownload={forceDownload}
      />
    </Dialog>
  );
};

export default DialogFile;
