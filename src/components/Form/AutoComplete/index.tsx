import { AutoComplete as AutoCompletePrime } from "primereact/autocomplete";
import { Button as ButtonPrime } from "primereact/button";
import { SelectItemOptionsType } from "primereact/selectitem";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  suggestions: SelectItemOptionsType;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  disabled?: boolean;
  handleSearch: (event: { query: string }) => void;
  handleAddButton?: () => void;
}

const AutoComplete = <T extends object>({
  className,
  name,
  label,
  suggestions,
  rules,
  autoFocus,
  form,
  disabled,
  handleSearch,
  handleAddButton,
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
                  {rules?.required ? (<span className="text-slate-300"> * </span>) : ('')}
                </label>
                <div className={`${handleAddButton && "p-inputgroup"}`}>
                  <AutoCompletePrime
                    id={field.name}
                    field="label"
                    suggestions={suggestions}
                    completeMethod={(e) => handleSearch(e)}
                    autoFocus={autoFocus}
                    dropdown
                    forceSelection
                    autoHighlight
                    showEmptyMessage
                    disabled={disabled}
                    emptyMessage="No results found"
                    className={
                      classNames({ "p-invalid ": fieldState.error }) + " w-full disabled:bg-slate-100"
                    }
                    inputClassName="disabled:bg-slate-100"
                    {...field}
                    inputRef={ref}
                  />
                  {handleAddButton && (
                    <ButtonPrime
                      type="button"
                      icon="pi pi-plus"
                      className="p-button-success"
                      disabled={disabled}
                      onClick={() => handleAddButton()}
                    />
                  )}
                </div>
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default AutoComplete;
