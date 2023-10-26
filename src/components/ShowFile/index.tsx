import React, { useEffect, useState } from "react";

import Loading from "../Loading";
import { AxiosInstance } from "axios";
import { generateUrlBlob, getFileNameOnRequest } from "../../utils/files";
import Swal from "sweetalert2";

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
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    setImageUrl("");
    setPdfUrl("");
    if (url) {
      setShowLoading(true);
      api
        .get(`${url}`, {
          responseType: "blob",
          params,
        })
        .then((response) => {
          if (response.headers["content-type"] === "application/pdf") {
            setPdfUrl(generateUrlBlob(response));
          } else {
            const fileURL = window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content-type"],
              })
            );
            if (response.headers["content-type"].includes("image")) {
              setImageUrl(fileURL);
            } else {
              const fileName = getFileNameOnRequest(response) ?? filename;
              const link = document.createElement("a");
              link.href = fileURL;
              if (fileName) link.download = fileName;
              link.click();
              setTimeout(() => {
                window.URL.revokeObjectURL(fileURL);
                link.remove();
              }, 100);
              if (onHide) onHide();
            }
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to load file!",
          });
          if (onHide) onHide();
        })
        .finally(() => setShowLoading(false));
    }
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
      <Loading show={showLoading} />
    </>
  );
};

export default ShowFile;
