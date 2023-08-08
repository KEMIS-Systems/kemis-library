import React from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { Calendar as CalendarPrime } from "primereact/calendar";

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  dateFormat?: string;
  mask?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  view?: "month" | "date" | "year";
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: "24" | "12";
  selectionMode?: "single" | "range" | "multiple";
  readOnlyInput?: boolean;
}

const InputDate = <T extends object>({
  name,
  label,
  dateFormat,
  mask,
  form,
  rules,
  disabled,
  autoFocus,
  className,
  view,
  showTime,
  timeOnly,
  hourFormat,
  selectionMode,
  readOnlyInput,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      <Controller
        name={name}
        control={form?.control}
        rules={rules}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              <CalendarPrime
                id={field.name}
                dateFormat={dateFormat ?? "dd/mm/yy"}
                mask={mask ?? !readOnlyInput ? "99/99/9999" : undefined}
                autoFocus={autoFocus}
                showIcon
                showButtonBar
                view={view ?? "date"}
                showTime={showTime}
                timeOnly={timeOnly}
                hourFormat={hourFormat}
                showOnFocus={false}
                selectionMode={selectionMode}
                readOnlyInput={readOnlyInput}
                className={
                  classNames({ "p-invalid ": fieldState.error }) + " w-full"
                }
                disabled={disabled}
                {...field}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default InputDate;
