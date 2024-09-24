import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { saveAs } from "file-saver";

import { AxiosInstance } from "axios";
import Loading from "../Loading";
import { generateUrlBlob } from "../../utils";

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
  params?: P;
  filename?: string;
  onHide?: () => void;
}

const ShowFile = ({
  api,
  url,
  header,
  params,
  filename,
  onHide,
}: IModalProps) => {
  const toast = useRef<Toast>(null);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    api
      .get<Blob>(url, {
        params,
        responseType: "blob",
      })
      .then((response) => {
        if (response.status !== 200 || !window) {
          setShowLoading(false);
          toast?.current?.show({
            severity: "error",
            summary: "Oops...",
            detail: "Não foi possivel carregar o arquivo",
          });
          onHide?.();
          return;
        }

        if (response.headers["content-type"]?.toString().includes("pdf")) {
          setPdfUrl(generateUrlBlob(response));
        } else if (
          response.headers["content-type"]?.toString().includes("image")
        ) {
          setImageUrl(
            window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content-type"]?.toString(),
              })
            )
          );
        } else {
          saveAs(response.data, filename);
        }
      })
      .finally(() => setShowLoading(false));
  }, [url]);

  return (
    <>
      {imageUrl && (
        <div className="flex items-center justify-center min-w-full max-w-full min-h-full max-h-full">
          <img
            src={imageUrl}
            alt={header}
            className="w-full h-full object-scale-down"
          />
        </div>
      )}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title={header}
          className="w-full min-h-screen max-h-screen"
        />
      )}
      <Toast ref={toast} />
      <Loading show={showLoading} />
    </>
  );
};

export default ShowFile;
