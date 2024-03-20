import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

import { AxiosInstance } from "axios";
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
  const [isFile, setIsFile] = useState(false);
  const [urlFile, setUrlFile] = useState<string | null>(null);

  function clearObjectUrl() {
    try {
      const pathObjectUrl = window.sessionStorage.getItem(
        'mcf_admin@objectUrl'
      );
      if (!pathObjectUrl) return;
      window.URL.revokeObjectURL(pathObjectUrl);
    } catch (error) {
      toast?.current?.show({
        severity: "error",
        summary: "Oops...",
        detail: "Não foi possivel carregar o arquivo",
      });
      if (onHide) onHide();
    }
  }

  useEffect(() => {
    api
      .get<Blob>(url, {
        responseType: 'blob',        
      })
      .then((resolve) => {
        if (resolve.status !== 200) {
          setShowLoading(false);
          return;
        }

        if (!window) {
          setShowLoading(false);
          return;
        }

        clearObjectUrl();

        const urlCreated = window.URL.createObjectURL(resolve.data);

        if (urlCreated) {
          setUrlFile(urlCreated);
          window.sessionStorage.setItem('mcf_admin@objectUrl', urlCreated);
        }

        if (resolve.headers['Content-Type']?.toString().includes('pdf')) {
          setIsFile(true);
        } else if (
          resolve.headers['Content-Type']?.toString().includes('image')
        ) {
          setIsFile(false);
        }

        setShowLoading(false);
      });
  }, [url]);
  
  return (
    <>      
      <div data-showme={isFile} className="data-[showme=false]:flex hidden items-center justify-center min-w-full max-w-full min-h-full max-h-full">
        <img
          src={urlFile || ''}
          alt={header}
          className="w-full h-full object-scale-down"
        />
      </div>
      
      <iframe
        data-showme={isFile}
        src={urlFile || ''}
        title={header}
        className="data-[showme=true]:flex hidden w-full min-h-screen max-h-screen"
      /> 

      <Toast ref={toast} />
      <Loading show={showLoading} />
    </>
  );
};

export default ShowFile;
