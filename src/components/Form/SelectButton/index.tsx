import React from "react";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { SelectButton as SelectButtonPrime } from "primereact/selectbutton";
import { SelectItemOptionsType } from "primereact/selectitem";
import { classNames } from "primereact/utils";

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  rules?: RegisterOptions;
  form: UseFormReturn<T>;
  label: string;
  options: SelectItemOptionsType;
}

const SelectButton = <T extends object>({
  name,
  rules,
  form,
  label,
  options,
}: IProps<T>) => {
  return (
    <Controller
      name={name}
      control={form?.control}
      rules={rules}
      render={({ field: { ref, ...field }, fieldState }) => {
        return (
          <>
            <label
              htmlFor="name"
              className={
                classNames({ "text-red-400 ": fieldState.error }) + "block "
              }
            >
              {label}
            </label>
            <SelectButtonPrime
              id={field.name}
              options={options}
              ref={ref}
              {...field}
            />
          </>
        );
      }}
    />
  );
};

export default SelectButton;
