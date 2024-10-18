import {
  InputMask as InputMaskPrime
} from "primereact/inputmask";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath
} from "react-hook-form";

// Components
import MessageError from "../MessageError";

// Types
import { IInputMaskProps } from "./types";

function InputMask({
  rules,
  form,
  name,
  label,
  className,
  ...props
}: IInputMaskProps<any>) {


  function onSetDDICode() {
    try {
      
    } catch (error) {
      // do anything
    }
  }
  
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
                  htmlFor={field.name}
                  data-haserror={fieldState.error && true}
                  className="block data-[haserror=true]:text-red-500"
                >
                  {label}
                  <span data-isrequred={rules?.required && true} className="hidden data-[isrequired=true]:block text-slate-300"> *</span>
                </label>
                <span className="flex flex-row items-center justify-start gap-3">

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
                </span>
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
