import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { Accept } from "react-dropzone";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import Dropzone from "../../Dropzone";
import MessageError from "../MessageError";

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
                <label htmlFor={field.name}>
                  {rules?.required ? (
                    <span className="text-slate-300"> *</span>
                  ) : (
                    ""
                  )}
                </label>
                <Dropzone
                  accept={accept}
                  maxFiles={maxFiles}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) +
                    " disabled:bg-slate-100"
                  }
                  invalid={!!fieldState.error}
                  {...field}
                  onChange={(e) => {
                    if (!fileChanged && e.length > 0) {
                      setFileChanged(true);
                      onChange(e);
                    }
                    handleChange?.(e);
                  }}
                />
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputFile;
