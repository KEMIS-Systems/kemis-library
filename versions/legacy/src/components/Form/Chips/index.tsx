/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ChipsChangeEvent, Chips as ChipsPrime } from "primereact/chips";
import {
  Controller,
  FieldValues,
  FieldPath,
  UseFormReturn,
  RegisterOptions,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  separator?: string;
  disabled?: boolean;
}

const Chips = <T extends object>({
  className,
  name,
  label,
  form,
  rules,
  separator,
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
                  {rules?.required ? (
                    <span className="text-slate-300"> *</span>
                  ) : (
                    ""
                  )}
                </label>
                <ChipsPrime
                  id={field.name}
                  separator={separator ?? ","}
                  ref={ref}
                  {...field}
                  disabled={disabled}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={
                    field.onChange as unknown as (
                      event: ChipsChangeEvent
                    ) => void
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
};

export default Chips;
