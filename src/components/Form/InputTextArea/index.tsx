import React from "react";
import { InputTextarea as InputTextareaPrime } from "primereact/inputtextarea";

import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";

interface IProps<T extends FieldValues> {
  className?: string;
  classNameLabel?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
}

const InputTextArea = <T extends object>({
  className,
  classNameLabel,
  name,
  label,
  rules,
  form,
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
                    "block " +
                    (classNameLabel !== undefined && classNameLabel)
                  }
                >
                  {label}
                </label>
                <InputTextareaPrime
                  id={field.name}
                  {...field}
                  className=" w-full"
                  placeholder={label}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputTextArea;
