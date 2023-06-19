import React, { ReactNode, useCallback, useState } from "react";
import { DialogProps } from "primereact/dialog";
import { FieldValues, UseFormReturn } from "react-hook-form";

import Form from "../Form";
import Dialog from "../../Dialog";
import { AxiosInstance } from "axios";
// import { useLanguage } from "./hooks/Language";

type K = {
  id?: number;
};

interface IProps<T extends FieldValues> {
  api?: AxiosInstance;
  dataEdit?: T & K;
  form: UseFormReturn<T>;
  url: string;
  header: ReactNode | ((props: DialogProps) => ReactNode);
  onHide: () => void;
  visible: boolean;
  children: React.ReactNode;
  onSubmit?: (data: T) => void;
  onRefreshTable?: (refreshTable: boolean) => void;
  getFormData?: (data: FieldValues) => FieldValues | FormData;
  classNameDialog?: string;
}

/**
 * Displays a form with the specified fields within a modal window. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param header modal header/title
 * @param form to control the form data
 * @param onHide callback to control what happen when you close the modal window
 * @param visible boolean to control the Modal visibility
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param path (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 * @param classNameDialog (optional) to add modal styles
 */
const FormDialog = <T extends object>({
  api,
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
  const [submitted, setSubmitted] = useState<boolean>(false);

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
        api={api}
        onHide={handleHide}
        dataEdit={dataEdit}
        path={url}
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
