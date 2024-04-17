/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputSwitch as InputSwitchPrime } from "primereact/inputswitch";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  disabled?: boolean;
}

const InputSwitch = <T extends object>({
  className,
  name,
  label,
  form,
  rules,
  disabled,
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
                    classNames({ "text-red-400 ": fieldState.error }) + " block"
                  }
                >
                  {label}
                  {rules?.required ? (<span className="text-slate-300"> * </span>) : ('')}
                </label>
                <InputSwitchPrime
                  inputId={field.name}
                  checked={field.value ?? false}
                  ref={ref}
                  defaultChecked={false}
                  disabled={disabled}
                  {...field}
                  className={classNames({ "p-invalid": fieldState.error }) + " disabled:bg-slate-100"}
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
