import { saveAs } from "file-saver";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";

import { AxiosInstance } from "axios";
import { generateUrlBlob } from "../../utils";
import Loading from "../Loading";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

   const isSafari = () =>
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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

        if (forceDownload) saveAs(response.data, filename);

        console.log(response.headers["content-type"]?.toString())

        if (response.headers["content-type"]?.toString().includes("pdf")) {
          setPdfUrl(generateUrlBlob(response));
        }

        if (
          response.headers["content-type"]?.toString().includes("image")
        ) {
          setImageUrl(
            window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content-type"]?.toString(),
              })
            )
          );
        }
      })
      .catch(e => console.log(e))
      .finally(() => setShowLoading(false));
  }, [url]);

  return (
    <>
      <div className="flex justify-center">
        <a
          // @ts-ignore
          href={imageUrl || pdfUrl}
          download={`${filename}.${imageUrl ? 'jpg' : 'pdf'}`}
          rel="noopener"
          className="flex cursor-pointer flex-row items-center gap-2 text-blue-500 mb-2 font-bold"
        >
          <FaDownload />
          <span>Baixe seu arquivo.</span>
        </a>
      </div>
      {imageUrl && !pdfUrl && (
        <div className="flex items-center justify-center min-w-full max-w-full min-h-full max-h-full">
          <img
            src={imageUrl}
            alt={header}
            className="w-full h-full object-scale-down"
          />
        </div>
      )}
      {pdfUrl && isSafari() === false && (
        <iframe
          src={pdfUrl}
          title={header}
          className="w-full min-h-screen max-h-screen"
        />
      )}
      {pdfUrl && isSafari() === true &&(
        <embed
          src={String(pdfUrl)}
          type="application/pdf"
          className="w-full min-h-screen max-h-screen"
        />
      )}
      <Toast ref={toast} />
      <Loading show={showLoading} />
    </>
  );
};

export default ShowFile;
