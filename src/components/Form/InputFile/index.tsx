import React, { useState } from "react";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { Accept } from "react-dropzone";
import Dropzone from "../../Dropzone";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  accept?: Accept;
  maxFiles?: number;
  handleChange?(files: File[]): void;
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
}

const InputFile = <T extends object>({
  className,
  name,
  accept,
  maxFiles,
  handleChange,
  rules,
  form,
}: IProps<T>) => {
  const [fileChanged, setFileChanged] = useState<boolean>(false);

  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={rules}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, onChange, ...field }, fieldState }) => {
            return (
              <>
                <Dropzone
                  accept={accept}
                  maxFiles={maxFiles}
                  className={classNames({ "p-invalid ": fieldState.error })}
                  invalid={!!fieldState.error}
                  {...field}
                  onChange={(e) => {
                    if (!fileChanged && e.length > 0) {
                      setFileChanged(true);
                      onChange(e);
                    }
                    handleChange && handleChange(e);
                  }}
                />
                {fieldState.error && (
                  <small className="p-error">{fieldState.error.message}</small>
                )}
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputFile;
