import { Calendar as CalendarPrime } from "primereact/calendar";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

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
  selectionMode?: "single" | "multiple" | "range";
  readOnlyInput?: boolean;
}

// Components
import MessageError from "../MessageError";

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
  readOnlyInput = false,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      <Controller
        name={name}
        control={form?.control}
        rules={rules}
        render={({ field: { ...field }, fieldState }) => {
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
              <CalendarPrime
                {...field}
                id={field.name}
                dateFormat={dateFormat ?? "dd/mm/yy"}
                // @ts-ignore
                autoFocus={autoFocus}
                mask={mask ?? "99/99/9999"}
                showIcon
                showButtonBar
                view={view ?? "date"}
                showTime={showTime}
                timeOnly={timeOnly}
                hourFormat={hourFormat}
                showOnFocus={false}
                selectionMode={selectionMode ?? "single"}
                readOnlyInput={readOnlyInput}
                className={
                  classNames({ "p-invalid ": fieldState.error }) +
                  ` w-full ${disabled ? "bg-slate-100" : ""}`
                }
                inputClassName={`disabled:bg-slate-100 ${
                  fieldState.error ? "p-invalid" : ""
                }`}
                disabled={disabled}
              />
              {<MessageError fieldState={fieldState} />}
            </>
          );
        }}
      />
    </div>
  );
};

export default InputDate;
