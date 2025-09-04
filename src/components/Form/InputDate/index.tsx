import { classNames } from "primereact/utils";
import { ChangeEvent, useCallback, useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn
} from "react-hook-form";

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  dateFormat?: string;
  mask?: string;
  form: UseFormReturn<T>;
  rules?: RegisterOptions;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  view?: "month" | "date" | "year";
  showTime?: boolean;
  timeOnly?: boolean;
  hourFormat?: "24" | "12";
  selectionMode?: "single" | "multiple" | "range";
  readOnlyInput?: boolean;
}

// Components
import { Calendar } from "primereact/calendar";
import MessageError from "../MessageError";

const InputDate = <T extends object>({
  name,
  label,
  dateFormat,
  mask,
  form,
  rules,
  disabled,
  autoFocus,
  className,
  view,
  showTime,
  timeOnly,
  hourFormat,
  selectionMode,
  readOnlyInput = false,
}: IProps<T>) => {
  const [date, setDate] = useState<string>('')

  // Função para tratar entrada numérica e converter para timestamp
  const handleDateInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    form.setValue(name, dateObj.toLocaleDateString("pt-BR"));
  }, [form, name]);

  return (
    <div className={className ?? ""}>
      <label
        htmlFor={name}
        data-hasdisabled={disabled}
        className={
          classNames({ "text-red-400 ": false }) + " block data-[hasdisabled=true]:text-slate-200"
        }
      >
        {label}
        {rules?.required ? (
          <span className="text-slate-300"> *</span>
        ) : (
          ""
        )}
      </label>

      <Controller
        name={name}
        control={form?.control}
        rules={rules}
        render={({ field: { ...field }, fieldState, formState }) => {
          return (
            <>
              <Calendar
                id={field.name}
                data-haserror={fieldState.error}
                name={`input-date-${name}`}
                inputClassName="data-[haserror=true]:border-[1.5px] data-[haserror=true]:border-red-400"
                autoFocus={autoFocus}
                dateFormat="dd/mm/yy"
                value={field.value}
                disabled={disabled}
                mask="99/99/9999"
                placeholder="dia / mês / ano"
                showIcon
                showButtonBar
                // @ts-ignore
                onChange={(e) => form.setValue(name, e.value)}
              />

              {<MessageError fieldState={fieldState} />}
            </>
          );
        }}
      />
    </div>
  );
};

export default InputDate;
