import React, { useCallback, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { AxiosInstance } from "axios";
import { useLanguage } from "../../../hooks/Language";
import Dialog from "../../Dialog";
import Form from "../Form";

type K = {
  id?: number;
};

interface IProps<T extends FieldValues> {
  api?: AxiosInstance;
  dataEdit?: T & K;
  url: string;
  onHide: () => void;
  onRefreshTable?: (refreshTable: boolean) => void;
  onSubmit?: (data: T) => void;
  getFormData?: (data: FieldValues) => FieldValues | FormData;
  form: UseFormReturn<T>;
  header: React.ReactNode;
  visible: boolean;
  classNameDialog?: string;
  children: React.ReactNode;
  hiddenSubmitButton?: boolean;
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
 * @param url (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 * @param classNameDialog (optional) to add modal styles
 * @param hiddenSubmitButton (optional) to hide the submit button
 */
const FormDialog = <T extends object>({
  onHide,
  dataEdit,
  api,
  url,
  onRefreshTable,
  onSubmit,
  getFormData,
  form,
  header,
  visible,
  classNameDialog,
  children,
  hiddenSubmitButton,
}: IProps<T>) => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleHide = useCallback(() => {
    form.reset();
    onHide();
  }, [onHide, form]);

  const footerContent = useCallback(() => {
    return (
      <div className="flex justify-end gap-3">
        <div>
          <button
            type="button"
            className="bg-light text-white py-2 px-4 rounded-lg font-bold"
            onClick={() => handleHide()}
          >
            {language.input.button_cancel}
          </button>
        </div>
        {!hiddenSubmitButton && (
          <div>
            <button
              type="submit"
              form="kemis-library-form"
              className="bg-primary text-white py-2 px-4 rounded-lg font-bold"
            // onClick={() => {
            //   setSubmitted(true);
            //   setTimeout(() => {
            //     setSubmitted(false);
            //   }, 1000);
            // }}
            >
              teste de post/put
            </button>
          </div>
        )}
      </div>
    );
  }, []);

  return (
    <Dialog
      header={header}
      visible={visible}
      className={classNameDialog ?? ""}
      footer={footerContent}
      onHide={handleHide}
    >
      <Form
        api={api}
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
