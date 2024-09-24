import { Calendar as CalendarPrime, CalendarProps } from "primereact/calendar";
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
import { twMerge } from "tailwind-merge";
import { IInputProps } from "../../../types/Input";
import MessageError from "../MessageError";

function teste<t>({}: Record<string, t>) {

}

teste<Record<string, Function>>({
  d: {
    dasds: () => ({})
  }
})

interface D extends Omit<CalendarProps, 'inputStyle' | 'name'>, Omit<IInputProps, 'onChange' | 'onSelect' | 'value'> {
}

const InputDate = ({
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
  inputStyle,
  labelStyle,
  ...rest
}: D ) => {
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
                  twMerge(classNames({
                      "text-red-400": fieldState.error,
                      "block": true,
                    }), 
                    labelStyle
                  )
                }
              >
                {label}
                <span 
                  data-showme={rules?.required && true} 
                  className="hidden data-[showme=true]:flex text-slate-300"
                >
                  *
                </span>
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
                inputClassName={
                  twMerge(classNames({
                    "p-invalid ": fieldState.error,
                    "disabled:bg-slate-100": true
                  }), 
                  inputStyle
                )}
                disabled={disabled}
                
                {...rest}
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
