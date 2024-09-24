import { InputText as InputTextPrime } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller
} from "react-hook-form";

// Components
import { twMerge } from "tailwind-merge";
import { IInputProps } from "../../../types/Input";
import MessageError from "../MessageError";

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
  labelStyle,
  ref,  
  ...rest
}: IInputProps) => {
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
                <InputTextPrime
                  {...field}
                  ref={ref}
                  id={field.name}
                  type={type ?? "text"}
                  autoFocus={autoFocus}
                  className={
                    twMerge(classNames({
                        "p-invalid ": fieldState.error,
                        "w-full": true,
                        "disabled:bg-slate-100": true
                      }), 
                      inputStyle
                    )
                  }
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
