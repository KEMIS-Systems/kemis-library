import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";

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
  forceDownload?: boolean;
  onHide?: () => void;
}

const ShowFile = ({
  api,
  url,
  header,
  params,
  filename,
  forceDownload,
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

        if (!forceDownload) {
          setImageUrl(
            window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content-type"]?.toString(),
              })
            )
          );
          if (response.headers["content-type"]?.toString().includes("pdf")) {
            setPdfUrl(generateUrlBlob(response));
            return;
          } else if (
            response.headers["content-type"]?.toString().includes("image")
          ) {
            return;
          }
        }

        saveAs(response.data, filename);
        onHide?.();
      })
      .finally(() => setShowLoading(false));
  }, [url]);

  return (
    <>
      {filename ? (
        <div className="flex justify-center">
          <a
            href={imageUrl}
            download={filename}
            target="_blank"
            rel="noopener"
            className="flex flex-row items-center gap-2 text-blue-500 mb-2 font-bold"
          >
            <FaDownload />
            <span>Baixe seu arquivo.</span>
          </a>
        </div>
      ) : null}
      {imageUrl && !pdfUrl && (
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
