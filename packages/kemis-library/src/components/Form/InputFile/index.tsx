import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { Accept } from "react-dropzone";
import {
  Controller
} from "react-hook-form";
import { IInputProps } from "../../../types/Input";
import Dropzone from "../../Dropzone";
import MessageError from "../MessageError";
import { twMerge } from "tailwind-merge";

interface D extends Omit<IInputProps, 'onChange' | 'onSelect' | 'value' | 'accept'> {
  accept?: Accept;
  maxFiles?: number;
  handleChange?(files: File[]): void;
}

const InputFile = ({
  className,
  name,
  label,
  accept,
  maxFiles,
  handleChange,
  rules,
  form,
  labelStyle,
  ...rest
}:D) => {
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
                <label
                  htmlFor={field.name}
                  className={
                    twMerge(classNames({
                        "text-red-400": fieldState.error,
                        "block": true,
                      }), 
                      labelStyle
                    )
                  }
                >
                  {label}
                  <span 
                    data-showme={rules?.required && true} 
                    className="hidden data-[showme=true]:flex text-slate-300"
                  >
                    *
                  </span>
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
