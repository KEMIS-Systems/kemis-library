import { InputNumber as InputNumberPrime, InputNumberProps } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import styled from "styled-components";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> extends Partial<InputNumberProps> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  mode?: "decimal" | "currency";
  currency?: string;
  locale?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  disabled?: boolean;
  defaultMoney?: boolean
}

const InputNumber = <T extends object>({
  className,
  name,
  label,
  defaultMoney = true,
  mode,
  currency,
  locale,
  form,
  rules,
  disabled,
  ...rest
}: IProps<T>) => {
  const [value, setValue] = useState<number>(0);

  // AUX Variables
  const moneyInputMode = {
    mode: "currency",
    currency: "BRL",
    locale: "pt-BR"
  }
                    
  const InputStyles = styled.div`
    .p-inputtext,
    .p-component,
    .p-inputnumber-input {
      width: 100%;
    }
  `;

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
                </label>
                <InputStyles>
                  { /* @ts-ignore  @ts-nocheck */ }
                  <InputNumberPrime
                    id={field.name}
                    {
                      ...(defaultMoney ? moneyInputMode : {})
                    }
                    className={
                      classNames({ "p-invalid ": fieldState.error }) + " w-full"
                    }
                    inputClassName="disabled:bg-slate-100"
                    disabled={disabled}
                    ref={ref}
                    {...field}
                    onChange={(event) => field.onChange(event.value)}
                    onBlur={(event) => setValue(Number(event.target.value))}
                    {...rest}
                  />
                  {<MessageError fieldState={fieldState} />}
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
