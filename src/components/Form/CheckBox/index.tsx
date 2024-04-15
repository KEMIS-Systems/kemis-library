import { Checkbox as CheckboxPrime } from "primereact/checkbox";
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
  inputId: string;
  className?: string;
  classNameLabel?: string;
  classNameCheckbox?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  style?: React.CSSProperties;
  check: boolean;
  onChange(value: boolean): void;
  disabled?: boolean;
}

const CheckBox = <T extends object>({
  inputId,
  className,
  classNameLabel,
  classNameCheckbox,
  name,
  label,
  rules,
  autoFocus,
  form,
  style,
  check,
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
                <label
                  htmlFor={inputId}
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    " block " +
                    (classNameLabel !== undefined && classNameLabel)
                  }
                >
                  {label}
                </label>
                <CheckboxPrime
                  inputId={inputId}
                  autoFocus={autoFocus}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) +
                    " w-full disabled:bg-slate-100" +
                    (classNameLabel !== undefined && classNameCheckbox)
                  }

                  ref={ref}
                  {...field}
                  style={style}
                  checked={check}
                  disabled={disabled}
                  onChange={(event) => onChange(!!event.target.checked)}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default CheckBox;
