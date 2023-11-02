import React from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";

import { useLanguage } from "../../../hooks/Language";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  feedback?: boolean;
  toggleMask?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const InputPassword = <T extends object>({
  className,
  name,
  label,
  form,
  rules,
  autoFocus,
  feedback,
  toggleMask,
  placeholder,
  disabled,
}: IProps<T>) => {
  const { language } = useLanguage();
  const passwordHeader = <h6>{language.input.password.header}</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">{language.input.password.bottom.title}</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>{language.input.password.bottom.rules.rule1}</li>
        <li>{language.input.password.bottom.rules.rule2}</li>
        <li>{language.input.password.bottom.rules.rule3}</li>
        <li>{language.input.password.bottom.rules.rule4}</li>
      </ul>
    </React.Fragment>
  );

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
                <Password
                  id={field.name}
                  autoFocus={autoFocus}
                  toggleMask={toggleMask ?? true}
                  header={feedback ? passwordHeader : undefined}
                  footer={feedback ? passwordFooter : undefined}
                  feedback={feedback}
                  placeholder={placeholder ?? "********"}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                  inputClassName=" w-full"
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

export default InputPassword;
