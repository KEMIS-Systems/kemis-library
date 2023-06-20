import React, { useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useLanguage } from "../../hooks/Language";

interface IDropzone {
  name?: string;
  accept?: Accept;
  maxFiles?: number;
  className?: string;
  invalid?: boolean;
  onChange?(files: File[]): void;
  openDialog?: boolean;
  style?: React.CSSProperties;
}

const Dropzone = ({
  accept,
  maxFiles,
  className,
  invalid,
  onChange,
  openDialog,
  style,
}: IDropzone) => {
  const { language } = useLanguage();
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    accept: accept,
    maxFiles: maxFiles,
  });

  useEffect(() => {
    if (onChange) {
      onChange(acceptedFiles);
    }
  }, [acceptedFiles, onChange]);

  useEffect(() => {
    if (openDialog) {
      open();
    }
  }, [openDialog, open]);

  return (
    <div
      {...getRootProps({
        className: `border border-1 bg-bray-200 py-8 px-5 flex flex-col justify-center items-center bg-stone-100 mb-2 rounded-lg ${
          invalid && "border-red-500"
        } ${className}`,
      })}
      style={style}
    >
      <input {...getInputProps()} />
      <AiOutlineCloudUpload size="40" />
      <p className="cursor-pointer text-center font-semibold text-gray-500 text-xs">
        {language.components.dropzone.message}
      </p>
      {acceptedFiles.length > 0 && (
        <div className="flex flex-col gap-2 text-xs mt-5 text-blue-400">
          {acceptedFiles.map((file) => {
            const i = Math.floor(Math.log(file.size) / Math.log(1024));
            return (
              <div key={file.name} className="flex gap-2 items-center">
                <span>{file.name}</span>
                <span className="font-bold">
                  {parseFloat((file.size / Math.pow(1024, i)).toFixed(2))} Kb
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
