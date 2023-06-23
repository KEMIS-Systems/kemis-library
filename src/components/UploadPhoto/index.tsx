import React, { useCallback, useEffect, useState } from "react";

import Dropzone from "../Dropzone";
import DialogPhoto from "../DialogPhoto";
import CropImage from "../CropImage";
import { FaTrashAlt } from "react-icons/fa";

interface IPhoto {
  image?: string;
  onChange(value?: File): void;
}

const UploadPhoto = ({ image, onChange }: IPhoto) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (image) setImagePreview(image);
  }, [image]);

  const handleFileSelected = useCallback((file: File[]) => {
    if (file[0]) {
      setImagePreview(URL.createObjectURL(file[0]));
    }
  }, []);

  const handlePhotoSelected = useCallback((file: File[]) => {
    setImagePreview(URL.createObjectURL(file[0]));
  }, []);

  const handleClickRemoveFile = useCallback(() => {
    setImagePreview("");
  }, []);

  const handleImageCopped = useCallback(
    (file: File) => {
      onChange(file);
    },
    [onChange]
  );

  return (
    <>
      {!imagePreview ? (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="mb-2 w-1/2">
            <Dropzone
              accept={{
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              }}
              maxFiles={1}
              onChange={(f) => handleFileSelected(f)}
            />
          </div>
          <div className="mb-2 w-1/2 flex">
            <DialogPhoto onChange={handlePhotoSelected} />
          </div>
        </div>
      ) : (
        <>
          <CropImage image={imagePreview} onChange={handleImageCopped} />
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-2 rounded-full"
              onClick={handleClickRemoveFile}
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UploadPhoto;
