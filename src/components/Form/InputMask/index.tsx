import {
  InputMask as InputMaskPrime,
  InputMaskProps
} from "primereact/inputmask";
import { classNames } from "primereact/utils";
import React, { InputHTMLAttributes } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form";

type TInputMask = Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'readOnly' | 'onFocus' | 'onBlur' | 'onChange' | 'form'> & Omit<InputMaskProps, 'form'>

interface IInputMaskProps<T extends FieldValues> extends TInputMask {
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
  label: string
  name: string;
}

function InputMask({ rules, form, name, label, className, ...props }: IInputMaskProps<any>) {
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
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) + "block"
                  }
                >
                  {label}
                </label>
                <InputMaskPrime
                  {...props}

                  name={field.name}
                  id={field.name}
                  ref={ref}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
}

{/* <InputMask onChange={(event) => event} form={{} as UseFormReturn} label="Your name" name="first_name" /> */ }

export default InputMask;
