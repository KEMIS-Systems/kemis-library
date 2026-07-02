import { classNames } from "primereact/utils";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

// Components
import { Calendar } from "primereact/calendar";
import MessageError from "../MessageError";

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
  timeOnly,
  hourFormat,
  selectionMode,
  readOnlyInput = false,
  showTime = false,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      <label
        htmlFor={name}
        data-hasdisabled={disabled}
        className={
          classNames({ "text-red-400 ": false }) +
          " block data-[hasdisabled=true]:text-slate-200"
        }
      >
        {label}
        {rules?.required ? <span className="text-slate-300"> *</span> : ""}
      </label>

      <Controller
        name={name}
        control={form?.control}
        rules={rules}
        render={({ field: { ...field }, fieldState }) => {
          return (
            <>
              <Calendar
                id={field.name}
                data-haserror={fieldState.error}
                name={`input-date-${name}`}
                inputClassName="kemis-input-data data-[haserror=true]:border-[1.5px] data-[haserror=true]:border-red-400"
                autoFocus={autoFocus}
                dateFormat={dateFormat ?? "dd/mm/yy"}
                mask={mask ?? "99/99/9999"}
                value={field.value}
                disabled={disabled}
                placeholder="dia / mês / ano"
                showIcon
                showButtonBar
                view={view ?? "date"}
                showTime={showTime}
                timeOnly={timeOnly}
                hourFormat={hourFormat}
                selectionMode={selectionMode}
                readOnlyInput={readOnlyInput}
                // @ts-expect-error PrimeReact's onChange event value is loosely typed
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
