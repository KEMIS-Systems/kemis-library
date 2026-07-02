import React, { useCallback } from "react";
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
  onRefreshTable?: (refreshTable: boolean, data?: T) => void;
  onSubmit?: (data: T) => void;
  getFormData?: (data: FieldValues) => FieldValues | FormData;
  form: UseFormReturn<T>;
  header: React.ReactNode;
  visible: boolean;
  maximizable?: boolean;
  classNameDialog?: string;
  children: React.ReactNode;
  forwardback?: (data: Partial<T & K>) => unknown;
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
  maximizable,
  classNameDialog,
  children,
  forwardback,
  hiddenSubmitButton,
}: IProps<T>) => {
  const { language } = useLanguage();

  const { isSubmitting } = form.formState;

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
            className="kemis-library-button-cancel text-white py-2 px-4 rounded-lg font-bold"
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
              data-submitting={isSubmitting}
              className="kemis-library-button-submitting text-white py-2 px-4 rounded-lg font-bold"
            >
              {isSubmitting ? language.input.button_wait : language.input.button_save}
            </button>
          </div>
        )}
      </div>
    );
  }, [isSubmitting]);

  // const handleSubmit = useCallback((d: T) => debounce(250, onSubmit, d), [onSubmit])

  return (
    <Dialog
      header={header}
      visible={visible}
      className={classNameDialog ?? ""}
      footer={footerContent}
      onHide={handleHide}
      maximizable={maximizable}
    >
      <Form
        api={api}
        onHide={handleHide}
        dataEdit={dataEdit}
        url={url}
        onSubmit={onSubmit}
        // onSubmit={d => debounce(250, onSubmit, d)}
        getFormData={getFormData}
        onRefreshTable={onRefreshTable}
        form={form}
        forwardback={forwardback}
      >
        {children}
      </Form>
    </Dialog>
  );
};

export default FormDialog;
