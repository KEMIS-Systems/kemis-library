import { Button as ButtonPrime } from "primereact/button";
import { Dropdown as DropdownPrime } from "primereact/dropdown";
import { SelectItemOptionsType } from "primereact/selectitem";
import { classNames } from "primereact/utils";
import React, { ReactNode, type ReactElement } from "react";
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
  optionGroupLabel?: string;
  optionGroupChildren?: string;
  optionGroupTemplate?: (option: any, index?: number) => React.ReactNode;
  valueTemplate?: React.ReactNode | ReactElement;
  itemTemplate?: React.ReactNode | ReactElement;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  handleAddButton?: () => void;
  disabled?: boolean;
  filter?: boolean;
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
  valueTemplate,
  itemTemplate,
  rules,
  autoFocus,
  handleAddButton,
  disabled,
  filter = true,
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
              htmlFor={field.name}
              className={classNames({ "text-red-400 ": fieldState.error }) + " block"}
            >
              {label}
              {rules?.required ? <span className="text-slate-300"> *</span> : ""}
            </label>
            <div className={`${handleAddButton && "p-inputgroup"}`}>
              <DropdownPrime
                id={field.name}
                options={options}
                optionLabel={optionLabel ?? "label"}
                optionValue={optionValue ?? "value"}
                autoFocus={autoFocus}
                showClear
                filter={filter}
                optionGroupLabel={optionGroupLabel}
                optionGroupChildren={optionGroupChildren}
                optionGroupTemplate={optionGroupTemplate}
                valueTemplate={valueTemplate}
                itemTemplate={itemTemplate}
                disabled={disabled}
                className={
                  classNames({ "p-invalid ": fieldState.error }) +
                  ` w-full ${disabled ? "bg-slate-100" : ""}`
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
