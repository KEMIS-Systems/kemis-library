import { AxiosError, AxiosInstance, Method } from "axios";
import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { useLanguage } from "../../../hooks/Language";
import Loading from "../../Loading";

type K = {
  id?: number;
};

export interface IProps<T extends FieldValues> {
  api?: AxiosInstance;
  dataEdit?: T & K;
  url: string;
  onHide?: () => void;
  onRefreshTable?: (refreshTable: boolean, data?: T) => void;
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
 * @param url (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 */
const Form = <T extends object>({
  api,
  onHide,
  dataEdit,
  url,
  onRefreshTable,
  onSubmit,
  getFormData,
  form,
  children,
}: IProps<T>) => {
  const { language } = useLanguage();
  const toast = useRef<Toast>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    if (dataEdit) {
      form.reset(dataEdit);
    }
  }, [dataEdit]);

  const handleHide = useCallback(() => {
    form?.reset();
    onHide?.();
  }, [onHide, form]);

  const handleSubmitData = useCallback(
    async (data: FieldValues) => {
      try {
        setShowLoading(true);
        if (api) {
          try {
            const formData: FieldValues | FormData = getFormData
              ? getFormData(data)
              : data;

            // AUX Variables
            const REQUEST_METHOD: Method = !dataEdit?.id ? 'post' : 'put'
            const REQUEST_PATH: string = `${url}${dataEdit?.id ? `/${dataEdit.id}` : ''}`

            await api[REQUEST_METHOD](REQUEST_PATH, formData).then(resolver => {
              setShowLoading(false);
              handleHide?.();

              onRefreshTable?.(true, resolver.data);

              toast?.current?.show({
                severity: "success",
                summary: "Success",
                detail:
                  language.pages.alerts?.[dataEdit?.id ? "edit" : "add"]?.success,
              });
            })

          } catch (error: AxiosError | any) {
            setShowLoading(false);
            console.log(
              error.response?.data?.errors,
              Object.keys(error.response?.data?.errors).length
            );
            if (Object.keys(error.response?.data?.errors).length > 0) {
              Object.values(error.response?.data?.errors).forEach(
                (message: unknown) => {
                  toast?.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: String(message),
                  });
                }
              );
            } else if (error.response?.data?.message) {
              toast?.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.message || "Fail to save data",
              });
            } else {
              console.log(error);
              toast?.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Fail to save data",
              });
            }
          }
        } else
          console.error(
            "If you want to POST/PUT, you must include the 'api' property in Form component."
          );
      } catch (error: any) {
        console.log("handleSubmitData@error", error);
      }
    },
    [dataEdit, url, getFormData, handleHide, onRefreshTable]
  );

  return (
    <>
      <form
        id="kemis-library-form"
        name="kemis-library-form"
        onSubmit={form.handleSubmit(onSubmit ?? handleSubmitData)}
      >
        {children}
      </form>
      <Toast ref={toast} />
      <Loading show={showLoading} />
    </>
  );
};

export default Form;
