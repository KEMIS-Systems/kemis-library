import React from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Calendar as CalendarPrime } from 'primereact/calendar';

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  dateFormat?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  disabled?: boolean;
}

const InputDate = <T extends object>({
  name,
  label,
  dateFormat,
  form,
  rules,
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
                classNames({ 'text-red-400 ': fieldState.error }) + 'block'
              }
            >
              {label}
            </label>
            <CalendarPrime
              id={field.name}
              dateFormat={dateFormat || 'dd/mm/yy'}
              mask="99/99/9999"
              showIcon
              showButtonBar
              showOnFocus={false}
              className={
                classNames({ 'p-invalid ': fieldState.error }) + 'w-full'
              }
              disabled={disabled}
              {...field}
            />
          </>
        );
      }}
    />
  );
};

export default InputDate;
