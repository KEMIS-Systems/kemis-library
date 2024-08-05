import { InputText as InputTextPrime } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form";

// Components
import MessageError from "../MessageError";

interface IProps
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
  name: FieldPath<any>;
  label: string;
  type?: "text" | "email" | "number" | "password" | "date";
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn;
  placeholder?: string;
  disabled?: boolean;
  inputStyle?: string | null;
}

const InputText = ({
  className,
  name,
  label,
  type,
  rules,
  autoFocus,
  form,
  placeholder,
  disabled,
  inputStyle,
  ...rest
}: IProps) => {
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
                <InputTextPrime
                  {...field}
                  ref={ref}
                  id={field.name}
                  type={type ?? "text"}
                  autoFocus={autoFocus}
                  className={`${classNames({
                    "p-invalid ": fieldState.error,
                  })} w-full disabled:bg-slate-100 ${inputStyle}`}
                  disabled={disabled}
                  placeholder={placeholder ?? undefined}
                  {...rest}
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

export default InputText;
