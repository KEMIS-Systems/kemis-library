import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import Swal from "sweetalert2";
import Toast from "../../../utils/toast";
import Loading from "../../Loading";
import { AxiosInstance } from "axios";

type K = {
  id?: number;
};

interface IProps<T extends FieldValues> {
  api?: AxiosInstance;
  dataEdit?: T & K;
  path?: string;
  submit?: boolean;
  onHide?: () => void;
  onRefreshTable?: (refreshTable: boolean) => void;
  onSubmit?: (data: T) => void;
  getFormData?: (data: FieldValues) => FieldValues | FormData;
  form: UseFormReturn<T>;
  children: React.ReactNode;
}

/**
 * Displays a form with the specified fields. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param form to control the form data
 * @param onHide (optional) callback to control what happen when you close/restart/clean the form
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param path (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 */
const Form = <T extends object>({
  api,
  onHide,
  dataEdit,
  path,
  submit,
  onRefreshTable,
  onSubmit,
  getFormData,
  form,
  children,
}: IProps<T>) => {
  const [showLoading, setShowLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleHide = useCallback(() => {
    form.reset();
    onHide && onHide();
  }, [onHide, form]);

  const handleSubmitData = useCallback(
    async (data: FieldValues) => {
      setShowLoading(true);
      if (api) {
        try {
          const formData: FieldValues | FormData = getFormData
            ? getFormData(data)
            : data;
          if (dataEdit?.id) {
            formData instanceof FormData
              ? await api.post(`${path}/${dataEdit.id}`, formData)
              : await api.put(`${path}/${dataEdit.id}`, formData);
            Toast.fire({
              icon: "success",
              title: "Success",
            });
          } else {
            await api.post(`${path}`, formData);
            Toast.fire({
              icon: "success",
              title: "Success",
            });
          }
          onRefreshTable && onRefreshTable(true);
          handleHide();
        } catch (error) {
          Swal.fire({
            title: "Opss...",
            text: "Error",
            icon: "error",
            willOpen: (popup) => {
              if (popup.parentElement) {
                popup.parentElement.style.zIndex = "5000";
              }
            },
          });
        } finally {
          setShowLoading(false);
        }
      } else
        console.error(
          "If you want to POST/PUT, you must include the 'api' property in Form component."
        );
    },
    [dataEdit, path, getFormData, handleHide, onRefreshTable]
  );

  useEffect(() => {
    submit && setSubmitted(submit);
  }, [submit]);

  useEffect(() => {
    submitted && form.handleSubmit(onSubmit || handleSubmitData)();
    setSubmitted(false);
  }, [submitted, form, onSubmit, handleSubmitData]);

  return (
    <>
      <form
        role="form"
        onSubmit={form.handleSubmit(onSubmit || handleSubmitData)}
      >
        {children}
      </form>
      <Loading show={showLoading} />
    </>
  );
};

export default Form;
