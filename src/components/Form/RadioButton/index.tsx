import React from "react";
import { RadioButton as RadioButtonPrime } from "primereact/radiobutton";
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
  classNameComponent?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  style?: React.CSSProperties;
  checked?: boolean;
  onChange(value: boolean): void;
  disabled?: boolean;
}

const RadioButton = <T extends object>({
  className,
  classNameLabel,
  classNameComponent,
  name,
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
                <label
                  htmlFor="name"
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    "block " +
                    (classNameLabel && classNameLabel)
                  }
                >
                  {label}
                </label>
                <RadioButtonPrime
                  id={field.name}
                  autoFocus={autoFocus}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) +
                    "w-full " +
                    (classNameComponent && classNameComponent)
                  }
                  ref={ref}
                  {...field}
                  style={style}
                  disabled={disabled}
                  checked={checked}
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

export default RadioButton;
