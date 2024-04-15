import React, { useCallback, useState } from "react";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import InputImageBox from "./Partials/Box";

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  handleChange(files: File[]): void;
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
}

const InputImage = <T extends object>({
  name,
  handleChange,
  rules,
  form,
}: IProps<T>) => {
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
          <InputImageBox handleChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default InputImage;
