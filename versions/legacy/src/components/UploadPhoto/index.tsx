import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import InputImage from "../Form/InputImage";

interface IParams {
  onChange(file: File): void;
}

interface IImageProps {
  image: File;
}

const defaultValues: IImageProps = {} as IImageProps;

const UploadPhoto: React.FC<IParams> = ({ onChange }) => {
  const form = useForm({ defaultValues });

  const handleChange = useCallback(
    (files: File[]) => {
      files && onChange(files[0]);
    },
    [onChange]
  );

  return (
    <div className="flex flex-row gap-2">
      <InputImage name="image" form={form as any} handleChange={handleChange} />
    </div>
  );
};

export default UploadPhoto;
