import React from "react";
import { InputSwitch as InputSwitchPrime } from "primereact/inputswitch";
import {
  Controller,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
}

const InputSwitch = <T extends object>({
  className,
  name,
  label,
  form,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={{ required: "Accept is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={
                  classNames({ "text-red-400 ": fieldState.error }) + "block"
                }
              >
                {label}
              </label>
              <InputSwitchPrime
                inputId={field.name}
                checked={field.value}
                inputRef={field.ref}
                className={classNames({ "p-invalid": fieldState.error })}
                onChange={(e: any) => field.onChange(e.value)}
              />
            </>
          )}
        />
      )}
    </div>
  );
};

export default InputSwitch;
