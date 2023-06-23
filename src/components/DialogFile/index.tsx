import React, { useCallback, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import Image from "next/image";

import Loading from "../Loading";
import { AxiosInstance } from "axios";
import generateUrlBlob from "../../utils/generateUrlBlob";

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
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleHide = useCallback(() => {
    onHide();
  }, [onHide]);

  useEffect(() => {
    setImageUrl("");
    setPdfUrl("");
    if (url) {
      setShowLoading(true);
      api
        .get(`${url}`, {
          responseType: "blob",
        })
        .then((response) => {
          if (response.headers["content-type"] === "application/pdf") {
            setPdfUrl(generateUrlBlob(response));
          } else {
            setImageUrl(
              window.URL.createObjectURL(
                new Blob([response.data], {
                  type: response.headers["content-type"],
                })
              )
            );
          }
        })
        .finally(() => setShowLoading(false));
    }
  }, [url]);

  return (
    <>
      <Dialog
        header={header}
        visible={show}
        onHide={handleHide}
        className="w-full sm:w-4/5 h-full"
        maximizable
      >
        {imageUrl && (
          <div className="relative">
            <Image
              src={imageUrl}
              alt={header}
              className="w-full h-1/3 p-10"
              layout="fill"
            />
          </div>
        )}
        {pdfUrl && (
          <iframe src={pdfUrl} title={header} className="w-full h-full" />
        )}
      </Dialog>
      <Loading show={showLoading} />
    </>
  );
};

export default DialogFile;
