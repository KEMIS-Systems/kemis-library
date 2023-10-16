import React, { useEffect, useState } from "react";

import Loading from "../Loading";
import { AxiosInstance } from "axios";
import generateUrlBlob from "../../utils/generateUrlBlob";

interface IModalProps {
  api: AxiosInstance;
  url: string;
  header: string;
}

const ShowFile = ({ api, url, header }: IModalProps) => {
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
