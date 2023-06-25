import React from "react";
import { AutoComplete as AutoCompletePrime } from "primereact/autocomplete";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { SelectItemOptionsType } from "primereact/selectitem";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  suggestions: SelectItemOptionsType;
  handleSearch: (event: { query: string }) => void;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
}

const AutoComplete = <T extends object>({
  className,
  name,
  label,
  suggestions,
  handleSearch,
  rules,
  autoFocus,
  form,
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
                  htmlFor="name"
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) + "block"
                  }
                >
                  {label}
                </label>
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
                  emptyMessage="No results found"
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                  {...field}
                  inputRef={ref}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default AutoComplete;
