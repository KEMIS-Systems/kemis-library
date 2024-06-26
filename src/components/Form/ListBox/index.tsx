import React, { ReactNode } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { ListBox as ListBoxPrime } from "primereact/listbox";
import { classNames } from "primereact/utils";
import { SelectItemOptionsType } from "primereact/selectitem";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  options: SelectItemOptionsType;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  multiple?: boolean;
  filter?: boolean;
  optionGroupLabel?: string;
  optionGroupChildren?: string;
  optionGroupTemplate?: ReactNode | ((option: any, index: number) => ReactNode);
  listStyle?: React.CSSProperties;
  disabled?: boolean;
}

const ListBox = <T extends object>({
  className,
  name,
  label,
  form,
  options,
  rules,
  optionGroupLabel,
  multiple,
  filter,
  optionGroupChildren,
  optionGroupTemplate,
  listStyle,
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
                <ListBoxPrime
                  id={field.name}
                  multiple={multiple}
                  filter={filter}
                  options={options}
                  optionGroupLabel={optionGroupLabel}
                  optionGroupChildren={optionGroupChildren}
                  optionGroupTemplate={optionGroupTemplate}
                  listStyle={listStyle ?? { maxHeight: "200px" }}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                  disabled={disabled}
                  {...field}
                  ref={ref}
                />
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default ListBox;
