import {
  InputMask as InputMaskPrime,
  InputMaskProps,
} from "primereact/inputmask";
import { classNames } from "primereact/utils";
import React, { InputHTMLAttributes } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

// Components
import { twMerge } from "tailwind-merge";
import MessageError from "../MessageError";

type TInputMask = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "disabled" | "readOnly" | "onFocus" | "onBlur" | "onChange" | "form"
> &
  Omit<InputMaskProps, "form">;

interface IInputMaskProps<T extends FieldValues> extends TInputMask {
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
  label: string;
  name: string;
}

function InputMask({
  rules,
  form,
  name,
  label,
  className,
  ...props
}: IInputMaskProps<any>) {
  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name as FieldPath<{}>}
          control={form.control}
          rules={rules}
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <>
                <label
                  htmlFor={name}
                  className={
                    twMerge(classNames({
                        "text-red-400": fieldState.error,
                        "block": true,
                      }), 
                      ''
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
                <InputMaskPrime
                  {...field}
                  {...props}
                  ref={ref}
                  name={field.name}
                  id={field.name}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) +
                    " w-full disabled:bg-slate-100"
                  }
                />
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}
    </div>
  );
}

export default InputMask;
