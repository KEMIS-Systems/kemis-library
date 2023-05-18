import React from "react";
import { BaseSyntheticEvent } from "react";
import { FieldValues } from "react-hook-form";
import { useLanguage } from "../../hooks/Language";

type onSubmitType = (data: FieldValues) => void;

type IModalButtonsProps = {
  handleSubmit: (
    callback: onSubmitType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  onSubmit: onSubmitType;
  handleHide(): void;
};

export const ButtonSubmitCancel = ({
  handleSubmit,
  onSubmit,
  handleHide,
}: IModalButtonsProps) => {
  const { language } = useLanguage();
  return (
    <div className="flex justify-end gap-3">
      <div>
        <button
          type="button"
          className="bg-light text-white py-2 px-4 rounded-lg font-bold"
          onClick={handleHide}
        >
          {language.input.button_cancel}
        </button>
      </div>
      <div>
        <button
          type="submit"
          className="bg-kemis text-white py-2 px-4 rounded-lg font-bold"
          onClick={handleSubmit(onSubmit)}
        >
          {language.input.button_save}
        </button>
      </div>
    </div>
  );
};
