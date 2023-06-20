/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { InputSwitch as InputSwitchPrime } from "primereact/inputswitch";
import {
  Controller,
  FieldValues,
  FieldPath,
  UseFormReturn,
  RegisterOptions,
} from "react-hook-form";
import { classNames } from "primereact/utils";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
}

const InputSwitch = <T extends object>({
  className,
  name,
  label,
  form,
  rules,
}: IProps<T>) => {
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
                    classNames({ "text-red-400 ": fieldState.error }) + "block"
                  }
                >
                  {label}
                </label>
                <InputSwitchPrime
                  inputId={field.name}
                  checked={field.value ?? false}
                  ref={ref}
                  defaultChecked={false}
                  {...field}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e: any) => field.onChange(e.value)}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputSwitch;
