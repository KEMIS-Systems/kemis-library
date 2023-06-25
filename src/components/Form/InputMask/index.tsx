import React from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import {
  InputMask as InputMaskPrime,
  InputMaskCompleteEvent,
} from "primereact/inputmask";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  mask: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  onComplete?: (e: InputMaskCompleteEvent) => void;
}

const InputMask = <T extends object>({
  className,
  name,
  label,
  mask,
  form,
  rules,
  autoFocus,
  onComplete,
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
                    classNames({ "text-red-400 ": fieldState.error }) + "block"
                  }
                >
                  {label}
                </label>
                <InputMaskPrime
                  id={field.name}
                  autoFocus={autoFocus}
                  mask={mask}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                  {...field}
                  ref={ref}
                  onChange={(event) => field.onChange(event.value)}
                  onComplete={onComplete}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputMask;
