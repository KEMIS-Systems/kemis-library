import React, { ReactNode, useCallback, useState } from "react";
import { DialogProps } from "primereact/dialog";
import { FieldValues, UseFormReturn } from "react-hook-form";

import Form from "../Form";
import Dialog from "../../Dialog";
// import { useLanguage } from "./hooks/Language";

type K = {
  id?: number;
};

interface IProps<T extends FieldValues> {
  dataEdit?: T & K;
  url?: string;
  onHide: () => void;
  onRefreshTable?: (refreshTable: boolean) => void;
  onSubmit?: (data: T) => void;
  getFormData?: (data: FieldValues) => FieldValues | FormData;
  form: UseFormReturn<T>;
  header: ReactNode | ((props: DialogProps) => ReactNode);
  visible: boolean;
  classNameDialog?: string;
  children: React.ReactNode;
}

const FormDialog = <T extends object>({
  onHide,
  dataEdit,
  url,
  onRefreshTable,
  onSubmit,
  getFormData,
  form,
  header,
  visible,
  classNameDialog,
  children,
}: IProps<T>) => {
  // const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleHide = useCallback(() => {
    form.reset();
    onHide();
  }, [onHide, form]);

  const footerContent = useCallback(
    () => (
      <div className="flex justify-end gap-3">
        <div>
          <button
            type="button"
            className="bg-light text-white py-2 px-4 rounded-lg font-bold"
            onClick={() => handleHide()}
          >
            {/* {language.input.button_cancel} */}
            Cancel
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-lg font-bold"
            onClick={() => {
              setSubmitted(true);
              setTimeout(() => {
                setSubmitted(false);
              }, 1000);
            }}
          >
            {/* {language.input.button_save} */}
            Save
          </button>
        </div>
      </div>
    ),
    [handleHide]
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      className={`w-full ${classNameDialog}`}
      footer={footerContent}
      onHide={handleHide}
    >
      <Form
        onHide={handleHide}
        dataEdit={dataEdit}
        url={url}
        submit={submitted}
        onSubmit={onSubmit}
        getFormData={getFormData}
        onRefreshTable={onRefreshTable}
        form={form}
      >
        {children}
      </Form>
    </Dialog>
  );
};

export default FormDialog;
