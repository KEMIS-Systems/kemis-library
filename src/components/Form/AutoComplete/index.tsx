import { AutoComplete as AutoCompletePrime } from "primereact/autocomplete";
import { Button as ButtonPrime } from "primereact/button";
import { classNames } from "primereact/utils";
import React, { ReactNode } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";
import { SelectItemOptionsType } from "primereact/selectitem";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  suggestions: SelectItemOptionsType;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  disabled?: boolean;
  itemTemplate?:
    | ReactNode
    | ((suggestion: any, index: number) => React.ReactNode);
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
  itemTemplate,
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
                  data-hasdisabled={disabled}
                  className={
                    classNames({ "text-red-400 ": fieldState.error }) +
                    " block data-[hasdisabled=true]:text-slate-200"
                  }
                >
                  {label}
                  {rules?.required ? (
                    <span className="text-slate-300"> *</span>
                  ) : (
                    ""
                  )}
                </label>
                <div className={`${handleAddButton && "p-inputgroup"}`}>
                  <AutoCompletePrime
                    id={field.name}
                    field="label"
                    suggestions={suggestions}
                    completeMethod={(e) => handleSearch(e)}
                    autoFocus={autoFocus}
                    forceSelection
                    autoHighlight
                    showEmptyMessage
                    disabled={disabled}
                    emptyMessage="No results found"
                    className={
                      classNames({ "p-invalid ": fieldState.error }) +
                      ` w-full ${disabled ? "bg-slate-100" : ""}`
                    }
                    optionGroupTemplate
                    inputClassName="disabled:bg-slate-100"
                    itemTemplate={itemTemplate}
                    {...field}
                    inputRef={ref}
                    onChange={(event) => field.onChange(event.target.value)}
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
