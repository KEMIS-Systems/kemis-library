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
                data-hasdisabled={disabled}
                className={
                  classNames({ "text-red-400 ": fieldState.error }) + " block data-[hasdisabled=true]:text-slate-200"
                }
              >
                {label}
                {rules?.required ? (
                  <span className="text-slate-300"> *</span>
                ) : (
                  ""
                )}
              </label>
              <input
                type="date"
                {...field}
                id={field.name}
                data-haserror={fieldState.error}
                disabled={disabled}
                className="appearance-none rounded-[6px] 
                  w-full h-[46px] p-[0.75rem] text-[#4b5563] 
                  bg-white border-[1px] 
                  transition-all duration-[0.2s] 
                  border-[#d1d5db] 
                  hover:border-[#4f46e5] 
                  focus:border-[#4f46e5] 
                  focus:shadow-md
                  focus:shadow-[#a5f3fc] 
                  outline-none 
                  disabled:bg-slate-100 
                  disabled:hover:border-[#c2c2c2]
                  data-[haserror=true]:border-[1.5px] 
                  data-[haserror=true]:border-red-400
                "
                autoFocus={autoFocus}
                inputMode="numeric"
                readOnly={readOnlyInput}
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
