import React, { useCallback, useRef, useState } from "react";
import { MdCameraAlt, MdOutlineAddAPhoto } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import Webcam from "react-webcam";
import Image from "next/image";
import dataUrlToFile from "../../utils/dataUrlToFile";
import { useLanguage } from "../../hooks/Language";

interface IInputPhoto {
  onChange(value?: File): void;
}

const InputPhoto = ({ onChange }: IInputPhoto) => {
  const { language } = useLanguage();
  const webcamRef = useRef<Webcam>(null);
  const [showTakePhoto, setShowTakePhoto] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [fileData, setFileData] = useState<File>({} as File);

  const handleClose = useCallback(() => {
    setFileData({} as File);
    setImagePreview("");
    setShowTakePhoto(false);
  }, []);

  const handleClickTakePhoto = useCallback(() => {
    setShowTakePhoto(true);
  }, []);

  const handleClickRemoveFile = useCallback(() => {
    setImagePreview("");
    setFileData({} as File);
  }, []);

  const handleTakePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const date = new Date().getTime();
      const file = await dataUrlToFile(imageSrc, `photo-${date}.jpg`);
      setFileData(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleClickSavePhoto = useCallback(() => {
    if (onChange) {
      onChange(fileData);
    }
    handleClose();
  }, [handleClose, fileData, onChange]);

  return (
    <>
      <div
        className="border border-1 border-dashed bg-bray-200 py-8 px-5 flex flex-col justify-center items-center bg-stone-100 mb-2 cursor-pointer"
        onClick={handleClickTakePhoto}
      >
        <MdOutlineAddAPhoto size="35" />
        <p className="text-center font-thin text-gray-500">
          {language.components.photo.message}
        </p>
      </div>
      <Dialog
        visible={showTakePhoto}
        onHide={handleClose}
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
              <Image src={imagePreview} alt="Foto" layout="fill" />
            </div>
          )}
        </div>
        <div className="flex justify-between mt-2">
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
          <div className="flex justify-end gap-2">
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
      </Dialog>
    </>
  );
};

export default InputPhoto;
