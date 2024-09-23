import React, { useCallback, useState } from "react";
import {
  Controller,
  FieldPath,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form";
import InputImageBox from "./Partials/Box";

interface IProps {
  name: FieldPath<any>;
  handleChange(files: File[]): void;
  rules?: RegisterOptions;
  form: UseFormReturn<any>;
}

const InputImage = ({
  name,
  handleChange,
  rules,
  form,
}: IProps) => {
  const [fileChanged, setFileChanged] = useState<boolean>(false);

  const handleFileChange = useCallback(
    (files: File[]) => {
      if (!fileChanged && files.length > 0) {
        setFileChanged(true);
      }
      handleChange(files);
    },
    [handleChange, fileChanged]
  );

  return (
    <div className=" w-full">
      {form && (
        <div>
          <Controller
            name={name}
            control={form.control}
            rules={rules}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { ref, onChange, ...field }, fieldState }) => {
              return (
                <input type="file" {...field} ref={ref} className="hidden" />
              );
            }}
          />
          <label htmlFor={name}>
            {rules?.required ? <span className="text-slate-300"> *</span> : ""}
          </label>
          <InputImageBox handleChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default InputImage;
