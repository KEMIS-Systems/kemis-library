import React from "react";
import { InputText as InputTextPrime } from "primereact/inputtext";
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
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "number" | "password" | "date";
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  placeholder?: string;
  disabled?: boolean;
}

const InputText = <T extends object>({
  className,
  name,
  label,
  type,
  rules,
  autoFocus,
  form,
  placeholder,
  disabled,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={rules}
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <>
                <label
                  htmlFor="name"
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) + "block"
                  }
                >
                  {label}
                </label>
                <InputTextPrime
                  id={field.name}
                  type={type ?? "text"}
                  autoFocus={autoFocus}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                  ref={ref}
                  disabled={disabled}
                  {...field}
                  placeholder={placeholder ?? undefined}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputText;
