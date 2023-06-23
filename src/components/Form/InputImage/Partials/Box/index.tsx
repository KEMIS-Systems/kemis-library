import React, { useCallback, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import DialogPhoto from "../../../../DialogPhoto";
import Dropzone from "../../../../Dropzone";
import CropImage from "../../../../CropImage";

interface IProps {
  handleChange(files: File[]): void;
}

const InputImageBox = ({ handleChange }: IProps) => {
  const [fileChanged, setFileChanged] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [takePhoto, setTakePhoto] = useState<boolean>(false);
  const [fileDataUrl, setFileDataUrl] = useState<string>("");
  const [fileData, setFileData] = useState<File>({} as File);

  const handleReturnURL = useCallback((file: File) => {
    if (file !== undefined) {
      const bynaryData = [];
      bynaryData.push(file);

      const returnImage = window.URL.createObjectURL(
        new Blob(bynaryData, { type: file.type })
      );

      setFileDataUrl(returnImage);
    }
  }, []);

  const handleFileSelected = useCallback(
    (files: File[]) => {
      setFileData(files[0]);
      handleChange && handleChange(files);
    },
    [handleChange]
  );

  const handleFileChange = (files: File[]) => {
    if (!fileChanged && files.length > 0) {
      setFileChanged(true);
    }
    handleFileSelected(files);
    handleReturnURL(files[0]);
    files.length && setTakePhoto(false);
  };

  const handleFileSelectedPhotoCrop = useCallback(
    (file: File) => {
      handleFileSelected([file]);
    },
    [handleFileSelected]
  );

  const handleFileDelete = useCallback(() => {
    setFileDataUrl("");
    handleFileSelected([] as File[]);
  }, [handleFileSelected]);

  return (
    <div className="w-full">
      <div className="border border-gray-300 rounded-t-xl p-2 flex gap-2">
        {!fileData ? (
          <>
            <button
              className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-green-400 bg-transparent hover:text-green-600 hover:border-gray-400"
              onClick={() => {
                setOpenDialog(true);
                setTimeout(() => {
                  setOpenDialog(false);
                }, 300);
              }}
            >
              <IoImageOutline size={20} />
            </button>
            <button
              className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-blue-400 bg-transparent hover:text-blue-600 hover:border-gray-400"
              onClick={() => {
                setTakePhoto(true);
              }}
            >
              <MdOutlineAddAPhoto size={20} />
            </button>
          </>
        ) : (
          <button
            className="rounded-full h-10 w-10 flex justify-center items-center border border-gray-300 text-red-400 bg-transparent hover:text-red-600 hover:border-gray-400"
            onClick={handleFileDelete}
          >
            <BiTrash size={20} />
          </button>
        )}
      </div>
      <div className="border border-gray-300 rounded-b-xl p-1">
        {!fileDataUrl ? (
          <>
            {takePhoto && <DialogPhoto show onChange={handleFileChange} />}
            <Dropzone
              accept={{
                "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".tiff"],
              }}
              maxFiles={1}
              onChange={(e) => {
                if (!fileChanged && e.length > 0) {
                  setFileChanged(true);
                }
                handleFileChange && handleFileChange(e);
              }}
              openDialog={openDialog}
            />
          </>
        ) : (
          <div>
            <CropImage
              image={fileDataUrl}
              onChange={handleFileSelectedPhotoCrop}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputImageBox;
