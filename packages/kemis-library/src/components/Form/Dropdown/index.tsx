import { Button as ButtonPrime } from "primereact/button";
import { Dropdown as DropdownPrime } from "primereact/dropdown";
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

// Components
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  options: SelectItemOptionsType;
  optionLabel?: string;
  optionValue?: string;
  optionGroupLabel?: string;
  optionGroupChildren?: string;
  optionGroupTemplate?: (option: any, index?: number) => React.ReactNode;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  handleAddButton?: () => void;
  disabled?: boolean;
}

const Dropdown = <T extends object>({
  name,
  label,
  form,
  options,
  optionLabel,
  optionValue,
  optionGroupLabel,
  optionGroupChildren,
  optionGroupTemplate,
  rules,
  autoFocus,
  handleAddButton,
  disabled,
}: IProps<T>) => {
  return (
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
              {rules?.required ? (
                <span className="text-slate-300"> *</span>
              ) : (
                ""
              )}
            </label>
            <div className={`${handleAddButton && "p-inputgroup"}`}>
              <DropdownPrime
                id={field.name}
                options={options}
                optionLabel={optionLabel ?? "label"}
                optionValue={optionValue ?? "value"}
                autoFocus={autoFocus}
                showClear
                filter
                optionGroupLabel={optionGroupLabel}
                optionGroupChildren={optionGroupChildren}
                optionGroupTemplate={optionGroupTemplate}
                disabled={disabled}
                className={
                  classNames({ "p-invalid ": fieldState.error }) +
                  " w-full disabled:bg-slate-100 "
                }
                {...field}
                onChange={(event) => field.onChange(event.target.value)}
              />
              {handleAddButton && (
                <ButtonPrime
                  type="button"
                  icon="pi pi-plus"
                  className="p-button-success"
                  disabled={disabled}
                  onClick={() => handleAddButton()}
                />
              )}
            </div>
            {<MessageError fieldState={fieldState} />}
          </>
        );
      }}
    />
  );
};

export default Dropdown;
