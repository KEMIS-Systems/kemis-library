import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

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
        responseType: "blob",
      })
      .then((resolve) => {
        if (resolve.status !== 200 || !window) {
          setShowLoading(false);
          toast?.current?.show({
            severity: "error",
            summary: "Oops...",
            detail: "Não foi possivel carregar o arquivo",
          });
          return;
        }

        if (resolve.headers["Content-Type"]?.toString().includes("pdf")) {
          setPdfUrl(generateUrlBlob(resolve));
        } else if (
          resolve.headers["Content-Type"]?.toString().includes("image")
        ) {
          setImageUrl(
            window.URL.createObjectURL(
              new Blob([resolve.data], {
                type: resolve.headers["Content-Type"]?.toString(),
              })
            )
          );
        } else {
          const urlData = window.URL.createObjectURL(new Blob([resolve.data]));

          const link = document.createElement("a");
          link.href = urlData;
          link.click();
          setTimeout(() => {
            window.URL.revokeObjectURL(urlData);
            link.remove();
          }, 100);
        }

        setShowLoading(false);
      });
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
