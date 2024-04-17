import { Button as ButtonPrime } from "primereact/button";
import { MultiSelect as MultiSelectPrime } from "primereact/multiselect";
import { SelectItemOptionsType } from "primereact/selectitem";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";

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
  optionGroupLabel?:string;
  optionGroupChildren?:string;
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
  optionGroupLabel,
  optionGroupChildren,
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
                  classNames({ "text-red-400 ": fieldState.error }) + " block"
                }
              >
                {label}
                {rules?.required ? (<span className="text-slate-300"> * </span>) : ('')}
              </label>
              <div className={`${handleAddButton && "p-inputgroup"}`}>
                <MultiSelectPrime
                  id={field.name}
                  options={options}
                  optionLabel={optionLabel ?? "label"}
                  optionValue={optionValue ?? "value"}
                  autoFocus={autoFocus}
                  showClear
                  filter
                  disabled={disabled}
                  display="chip"
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full disabled:bg-slate-100"
                  }
                  {...field}
                  ref={ref}
                  onChange={(event) => field.onChange(event.target.value)}
                  optionGroupLabel={optionGroupLabel}
                  optionGroupChildren={optionGroupChildren}
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
              {<MessageError fieldState={fieldState} />}
            </>
          );
        }}
      />
    </div>
  );
};

export default MultiSelect;
