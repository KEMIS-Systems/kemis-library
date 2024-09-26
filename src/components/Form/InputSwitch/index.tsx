/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputSwitch as InputSwitchPrime } from "primereact/inputswitch";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller
} from "react-hook-form";

// Types
import { IInputProps } from "../../../types/Input";

import { twMerge } from "tailwind-merge";
import MessageError from "../MessageError";

const InputSwitch = ({
  className,
  name,
  label,
  form,
  rules,
  disabled,
  labelStyle,
  inputStyle
}: IInputProps) => {
  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form?.control}
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
                <InputSwitchPrime
                  inputId={field.name}
                  checked={field.value ?? false}
                  ref={ref}
                  defaultChecked={false}
                  disabled={disabled}
                  {...field}
                   className={
                    twMerge(classNames({
                        "p-invalid ": fieldState.error,
                        "disabled:bg-slate-100": true
                      }), 
                      inputStyle
                    )
                  }
                  onChange={(e: any) => field.onChange(e.value)}
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

export default InputSwitch;
