import React from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from 'react-hook-form';
import { Dropdown as DropdownPrime } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { SelectItemOptionsType } from 'primereact/selectitem';
import { Button as ButtonPrime } from 'primereact/button';

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  options: SelectItemOptionsType;
  selected?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  handleAddButton?: (index: number) => void;
  disabled?: boolean;
}

const Dropdown = <T extends object>({
  className,
  name,
  label,
  form,
  options,
  selected,
  rules,
  autoFocus,
  handleAddButton,
  disabled,
}: IProps<T>) => {
  return (
    <div className={'mb-5 ' + (className !== undefined && className)}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={rules}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <div className={`${handleAddButton && 'p-inputgroup'}`}>
                  <DropdownPrime
                    id={field.name}
                    options={options}
                    autoFocus={autoFocus}
                    showClear
                    filter
                    className={
                      classNames({ 'p-invalid ': fieldState.error }) + 'w-full '
                    }
                    placeholder={selected}
                    {...field}
                    // ref={ref}
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
      )}
    </div>
  );
};

export default Dropdown;
