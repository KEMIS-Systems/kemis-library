import React from "react";
import { Checkbox as CheckboxPrime } from "primereact/checkbox";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";

interface IProps<T extends FieldValues> {
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
}

const CheckBox = <T extends object>({
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
                  htmlFor="name"
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    "block " +
                    (classNameLabel !== undefined && classNameLabel)
                  }
                >
                  {label}
                </label>
                <CheckboxPrime
                  id={field.name}
                  autoFocus={autoFocus}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) +
                    "w-full " +
                    (classNameCheckbox !== undefined && classNameCheckbox)
                  }
                  ref={ref}
                  {...field}
                  style={style}
                  checked={check}
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
