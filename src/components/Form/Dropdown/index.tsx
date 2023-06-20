import React from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { Dropdown as DropdownPrime } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { SelectItemOptionsType } from "primereact/selectitem";
import { Button as ButtonPrime } from "primereact/button";

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
  handleAddButton?: (index: number) => void;
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
                classNames({ "text-red-400 ": fieldState.error }) + "block"
              }
            >
              {label}
            </label>
            <div className={`${handleAddButton && "p-inputgroup"}`}>
              <DropdownPrime
                id={field.name}
                options={options}
                optionLabel={optionLabel || "label"}
                optionValue={optionValue || "value"}
                autoFocus={autoFocus}
                showClear
                filter
                optionGroupLabel={optionGroupLabel}
                optionGroupChildren={optionGroupChildren}
                optionGroupTemplate={optionGroupTemplate}
                disabled={disabled}
                className={
                  classNames({ "p-invalid ": fieldState.error }) + " w-full "
                }
                {...field}
                // ref={ref}
                onChange={(event) => field.onChange(event.target.value)}
                onShow={() => {
                  let styleDropdown: any =
                    document.getElementsByClassName("p-dropdown-panel");
                  styleDropdown = Array.prototype.slice.call(styleDropdown);
                  styleDropdown.forEach(function (element: any) {
                    element.style.zIndex = 9999;
                  });
                }}
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
  );
};

export default Dropdown;
