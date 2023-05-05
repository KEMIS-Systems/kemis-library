import React, { useState } from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputNumber as InputNumberPrime } from 'primereact/inputnumber';
import styled from 'styled-components';

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  mode?: string;
  currency?: string;
  locale?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
}

const InputNumber = <T extends object>({
  className,
  name,
  label,
  mode,
  currency,
  locale,
  form,
  rules,
}: IProps<T>) => {
  const [value, setValue] = useState<number>(0);

  const InputStyles = styled.div`
    .p-inputtext,
    .p-component,
    .p-inputnumber-input {
      width: 100%;
    }
  `;

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
                <InputStyles>
                  <InputNumberPrime
                    id={field.name}
                    mode={mode || 'currency'}
                    currency={currency || 'BRL'}
                    locale={locale || 'pt-BR'}
                    value={value ? value : field.value}
                    // {...field}
                    ref={ref}
                    onChange={(event) => field.onChange(event.value)}
                    onBlur={(event) => setValue(Number(event.target.value))}
                  />
                </InputStyles>
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default InputNumber;
