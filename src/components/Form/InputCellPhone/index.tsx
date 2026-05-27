import React from "react";
import { PhoneInput } from "react-international-phone";

// Types
import { IInputCellPhoneProps } from "./types";

export default function InputCellPhone({
  form,
  name,
  lang = "br",
  label,
}: IInputCellPhoneProps<any>) {
  return (
    <>
      <label htmlFor={name}>{label}</label>

      <PhoneInput
        name={name}
        defaultCountry={lang}
        value={form.getValues()[name] || ""}
        onChange={(phone, meta) => form.setValue(name, meta.inputValue)}
        className="!h-[50px]"
        countrySelectorStyleProps={{
          className: "!h-[50px]",
          buttonStyle: {
            height: "50px",
            padding: "16px",
          },
          dropdownStyleProps: {
            style: {
              paddingTop: "8px",
              paddingLeft: "16px",
              paddingRight: "16px",
            },
          },
        }}
        inputClassName="w-full !min-h-[50px] !h-[50px] !max-h-[50px]"
      />
    </>
  );
}
