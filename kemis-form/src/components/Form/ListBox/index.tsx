import React from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from 'react-hook-form';
import {
  ListBox as ListBoxPrime,
  ListBoxOptionGroupTemplateType,
} from 'primereact/listbox';
import { classNames } from 'primereact/utils';
import { SelectItemOptionsType } from 'primereact/selectitem';

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  options: SelectItemOptionsType;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  multiple?: boolean;
  optionGroupLabel?: string;
  optionGroupChildren?: string;
  optionGroupTemplate?: ListBoxOptionGroupTemplateType;
  listStyle?: React.CSSProperties;
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
  optionGroupChildren,
  optionGroupTemplate,
  listStyle,
}: IProps<T>) => {
  return (
    <div className={'mb-5 ' + (className !== undefined && className)}>
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
                    classNames({ 'text-red-400 ': fieldState.error }) + 'block'
                  }
                >
                  {label}
                </label>
                <ListBoxPrime
                  id={field.name}
                  multiple={multiple}
                  options={options}
                  optionGroupLabel={optionGroupLabel}
                  optionGroupChildren={optionGroupChildren}
                  optionGroupTemplate={optionGroupTemplate}
                  listStyle={listStyle || { maxHeight: '200px' }}
                  className={
                    classNames({ 'p-invalid ': fieldState.error }) + 'w-full'
                  }
                  {...field}
                  ref={ref}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default ListBox;
