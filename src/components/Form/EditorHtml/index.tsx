import React from "react";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  FieldPath,
  UseFormReturn,
} from "react-hook-form";
import { classNames } from "primereact/utils";
import { Editor } from "primereact/editor";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
}

const EditorHtml = <T extends object>({
  className,
  name,
  label,
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <Editor
                  id={field.name}
                  style={{ height: "120px" }}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full"
                  }
                  autoFocus={autoFocus}
                  {...field}
                  onTextChange={(e) => {
                    field.onChange(e.htmlValue);
                  }}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default EditorHtml;
