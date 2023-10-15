import React from "react";
import {
  RadioButtonChangeEvent,
  RadioButton as RadioButtonPrime,
} from "primereact/radiobutton";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";

interface IProps<T extends FieldValues> {
  inputId: string;
  className?: string;
  classNameLabel?: string;
  classNameComponent?: string;
  name: FieldPath<T>;
  label: string;
  value?: any;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  style?: React.CSSProperties;
  checked?: boolean;
  onChange(event: RadioButtonChangeEvent): void;
  disabled?: boolean;
}

const RadioButton = <T extends object>({
  inputId,
  className,
  classNameLabel,
  classNameComponent,
  name,
  value,
  label,
  rules,
  autoFocus,
  form,
  style,
  checked,
  onChange,
  disabled,
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
                <RadioButtonPrime
                  inputId={inputId}
                  autoFocus={autoFocus}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) +
                    "w-full " +
                    (classNameComponent !== undefined && classNameComponent)
                  }
                  ref={ref}
                  {...field}
                  value={value}
                  style={style}
                  disabled={disabled}
                  checked={checked}
                  onChange={onChange}
                />
                <label
                  htmlFor={inputId}
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    "block cursor-pointer " +
                    (classNameLabel !== undefined && classNameLabel)
                  }
                >
                  {label}
                </label>
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default RadioButton;
