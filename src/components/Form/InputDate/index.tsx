import { addDays, format } from "date-fns";
import { classNames } from "primereact/utils";
import React, { ChangeEvent, useCallback, useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn
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
  const [date, setDate] = useState<Date>(new Date())

  const handlerDateValue = useCallback((element: ChangeEvent<HTMLInputElement>) => {
    if (!element.target || !element.target.valueAsNumber) return;

    const DATE_FIXED = addDays(new Date(element.target.valueAsNumber), 1)

    // @ts-ignore
    form.setValue(name, DATE_FIXED.getTime())
  }, [setDate, form])

  return (
    <div className={className ?? ""}>
      <label
        htmlFor={name}
        data-hasdisabled={disabled}
        className={
          classNames({ "text-red-400 ": false }) + " block data-[hasdisabled=true]:text-slate-200"
        }
      >
        {label}
        {rules?.required ? (
          <span className="text-slate-300"> *</span>
        ) : (
          ""
        )}
      </label>

      <Controller
        name={name}
        control={form?.control}
        rules={rules}
        render={({ field: { ...field }, fieldState, formState }) => {
          return (
            <>
              <input
                type="date"
                disabled={disabled}
                id={`input-date-${name}`}
                name={`input-date-${name}`}
                className="appearance-none rounded-[6px] w-full h-[46px] p-[0.75rem] text-[#4b5563] bg-white border-[1px] transition-all duration-[0.2s] border-[#d1d5db] hover:border-[#4f46e5] focus:border-[#4f46e5] focus:shadow-md focus:shadow-[#a5f3fc] outline-none  disabled:bg-slate-100 disabled:hover:border-[#c2c2c2] data-[haserror=true]:border-[1.5px] data-[haserror=true]:border-red-400"
                autoFocus={autoFocus}
                inputMode="numeric"
                readOnly={readOnlyInput}
                value={format(field.value || new Date(), "yyyy-MM-dd")}
                onChange={(e) => handlerDateValue(e)}
              />
              <input
                type="text"
                {...field}
                id={field.name}
                data-haserror={fieldState.error}
                className="!hidden"
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
