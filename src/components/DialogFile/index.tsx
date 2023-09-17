import React, { useCallback } from "react";
import { Dialog } from "primereact/dialog";

import { AxiosInstance } from "axios";
import ShowFile from "../ShowFile";

interface P {
  [key: string]:
    | string
    | number
    | string[]
    | number[]
    | Date
    | Date[]
    | boolean
    | undefined;
}

interface IModalProps {
  api: AxiosInstance;
  url: string;
  header: string;
  show: boolean;
  params?: P;
  filename?: string;
  onHide: () => void;
}

const DialogFile = ({
  api,
  url,
  header,
  show,
  params,
  filename,
  onHide,
}: IModalProps) => {
  const handleHide = useCallback(() => {
    onHide();
  }, [onHide]);

  return (
    <>
      <Dialog
        header={header}
        visible={show}
        onHide={handleHide}
        className="w-full lg:w-4/5 min-h-screen max-h-screen"
        maximizable
      >
        <ShowFile
          api={api}
          header={header}
          url={url}
          params={params}
          filename={filename}
          onHide={handleHide}
        />
      </Dialog>
    </>
  );
};

export default DialogFile;
