import React from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { MultiSelect as MultiSelectPrime } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { SelectItemOptionsType } from "primereact/selectitem";
import { Button as ButtonPrime } from "primereact/button";

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  options: SelectItemOptionsType;
  optionLabel?: string;
  optionValue?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  handleAddButton?: (index: number) => void;
  disabled?: boolean;
  className?: string;
}

const MultiSelect = <T extends object>({
  name,
  label,
  form,
  options,
  optionLabel,
  optionValue,
  rules,
  autoFocus,
  handleAddButton,
  disabled,
  className,
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
              <div className={`${handleAddButton && "p-inputgroup"}`}>
                <MultiSelectPrime
                  id={field.name}
                  options={options}
                  optionLabel={optionLabel || "label"}
                  optionValue={optionValue || "value"}
                  autoFocus={autoFocus}
                  showClear
                  filter
                  disabled={disabled}
                  display="chip"
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + "w-full "
                  }
                  {...field}
                  ref={ref}
                  onChange={(event) => field.onChange(event.target.value)}
                />
                {handleAddButton && (
                  <ButtonPrime
                    type="button"
                    icon="pi pi-plus"
                    className="p-button-success"
                    disabled={disabled}
                    onClick={() => handleAddButton(4)}
                  />
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default MultiSelect;
