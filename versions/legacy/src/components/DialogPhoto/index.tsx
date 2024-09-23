import { Dialog } from "primereact/dialog";
import React, { useCallback, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import Webcam from "react-webcam";

import { useLanguage } from "../../hooks/Language";
import dataUrlToFile from "../../utils/dataUrlToFile";

interface IParams {
  show?: boolean;
  onHide: () => void;
  onChange(files: File[]): void;
}

const DialogPhoto: React.FC<IParams> = ({ onChange, show, onHide }) => {
  const { language } = useLanguage();
  const webcamRef = useRef<Webcam>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [fileData, setFileData] = useState<File[]>([] as File[]);

  const handleClose = useCallback(() => {
    setFileData([] as File[]);
    setImagePreview("");
    onHide();
  }, [onHide]);

  const handleClickRemoveFile = useCallback(() => {
    setImagePreview("");
    setFileData([] as File[]);
  }, []);

  const handleTakePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const date = new Date().getTime();
      const file = await dataUrlToFile(imageSrc, `photo-${date}.jpg`);
      setFileData([file]);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleClickSavePhoto = useCallback(() => {
    if (onChange) {
      onChange(fileData);
    }
    handleClose();
  }, [handleClose, fileData, onChange]);

  const footerContent = useCallback(() => {
    return (
      <div className="flex justify-end gap-3">
        <div>
          {imagePreview && (
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold"
              onClick={handleClickRemoveFile}
            >
              {language.input.button_delete}
            </button>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <div>
            <button
              type="button"
              className="bg-light text-white py-2 px-4 rounded-lg font-bold"
              onClick={handleClose}
            >
              {language.input.button_cancel}
            </button>
          </div>
          {imagePreview && (
            <div>
              <button
                type="button"
                onClick={handleClickSavePhoto}
                className="bg-primary text-white py-2 px-4 rounded-lg font-bold"
              >
                {language.input.button_save}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }, [imagePreview]);

  return (
    <Dialog
      visible={show}
      onHide={handleClose}
      footer={footerContent}
      className="w-full sm:w-1/3"
    >
      <div>
        {!imagePreview ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="bg-white w-full h-full relative"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "environment",
              }}
            />
            <div className="flex justify-center mt-5">
              <button
                type="button"
                className="bg-kemis text-white px-2 py-2 rounded-full"
                onClick={handleTakePhoto}
              >
                <MdCameraAlt size={30} />
              </button>
            </div>
          </>
        ) : (
          <div className="relative aspect-video">
            <img src={imagePreview} alt="Foto" className="max-w-full" />
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default DialogPhoto;
