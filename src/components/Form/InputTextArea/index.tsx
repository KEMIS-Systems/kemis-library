import { InputTextarea as InputTextareaPrime } from "primereact/inputtextarea";
import React from "react";

import { classNames } from "primereact/utils";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  classNameLabel?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: boolean;
}

const InputTextArea = <T extends object>({
  className,
  classNameLabel,
  name,
  label,
  rules,
  form,
  disabled,
  autoFocus,
  placeholder,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={rules}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <>
                <label
                  htmlFor={field.name}
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    " block " +
                    (classNameLabel !== undefined && classNameLabel)
                  }
                >
                  {label}
                  {rules?.required ? (
                    <span className="text-slate-300"> *</span>
                  ) : (
                    ""
                  )}
                </label>
                <InputTextareaPrime
                  id={field.name}
                  {...field}
                  disabled={disabled}
                  autoFocus={autoFocus}
                  className={` w-full ${disabled ? "bg-slate-100" : ""}`}
                  placeholder={!placeholder ? label: ''}
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

export default InputTextArea;
