import { Button as ButtonPrime } from "primereact/button";
import { InputNumber as InputNumberPrime, InputNumberProps } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import React, { ReactElement, useState } from "react";
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
  defaultMoney?: boolean;
  iconAddButton?: string;
  handleAddButton?: () => void;
  child?: ReactElement;
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

  child,

  rules,
  disabled,
  iconAddButton,
  handleAddButton,
  ...rest
}: IProps<T>) => {
  const [value, setValue] = useState<number>(0);

  // AUX Variables
  const moneyInputMode = {
    mode: "currency",
    currency: "BRL",
    locale: "pt-BR",
  };

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
                  data-hasdisabled={disabled}
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    " block data-[hasdisabled=true]:text-slate-200"
                  }
                >
                  {label}
                  {rules?.required ? <span className="text-slate-300"> *</span> : ""}
                </label>
                <InputStyles>
                  <div
                    data-hasbutton={handleAddButton && true}
                    className={`flex flex-row items-center justify-start gap-2 ${handleAddButton && "p-inputgroup"}`}
                  >
                    {/* @ts-ignore  @ts-nocheck */}
                    <InputNumberPrime
                      {...field}
                      id={field.name}
                      {...(defaultMoney ? moneyInputMode : {})}
                      className={
                        classNames({ "p-invalid ": fieldState.error }) +
                        ` w-full ${disabled ? "bg-slate-100" : ""}`
                      }
                      inputClassName="disabled:bg-slate-100"
                      disabled={disabled}
                      ref={ref}
                      onChange={(event) => field.onChange(event.value)}
                      onBlur={(event) => setValue(Number(event.target.value))}
                      {...rest}
                    />
                    {handleAddButton && (
                      <ButtonPrime
                        type="button"
                        icon={`${iconAddButton ? iconAddButton : "pi pi-plus"}`}
                        className="p-button-success"
                        disabled={disabled}
                        onClick={() => handleAddButton()}
                      />
                    )}
                    {child && <>{child}</>}
                  </div>
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
