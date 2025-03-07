import { InputText as InputTextPrime } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { ReactElement } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

// Components
import MessageError from "../MessageError";

interface IProps<T extends FieldValues>
  extends Partial<
    Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "onInput" | "ref" | "value" | "form"
    >
  > {
  className?: string;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "number" | "password" | "date";
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  placeholder?: string;
  disabled?: boolean;
  inputStyle?: string | null;
  child?: ReactElement
}

const InputText = <T extends object>({
  className,
  name,
  label,
  type,
  rules,
  autoFocus,
  form,
  child,
  placeholder,
  disabled,
  inputStyle,
  ...rest
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
                  htmlFor={field.name}
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) + " block"
                  }
                  >
                    {label}
                    {rules?.required ? (
                    <span className="text-slate-300"> *</span>
                    ) : (
                    ""
                    )}
                </label>
                <div className="flex flex-row items-center justify-start gap-2 [&_.p-inputtext]:disabled:bg-slate-100">
                  <InputTextPrime
                    {...field}
                    ref={ref}
                    id={field.name}
                    type={type ?? "text"}
                    autoFocus={autoFocus}
                    className={
                      classNames({ "p-invalid ": fieldState.error }) +
                      ` w-full ${disabled ? "bg-slate-100" : ""}`
                    }
                    disabled={disabled}
                    placeholder={placeholder ?? undefined}
                    {...rest}
                  />
                  {
                    child && <>{child}</>
                  }
                </div>
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}      
    </div>
  );
};

export default InputText;
