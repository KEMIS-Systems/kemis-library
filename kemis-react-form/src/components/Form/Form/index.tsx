import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import Swal from "sweetalert2";
import Toast from "../../../utils/toast";
import api from "../../../services/api";
import Loading from "../../Loading";

type K = {
  id?: number;
};

interface IProps<T extends FieldValues> {
  dataEdit?: T & K;
  url?: string;
  submit?: boolean;
  onHide?: () => void;
  onRefreshTable?: (refreshTable: boolean) => void;
  onSubmit?: (data: T) => void;
  getFormData?: (data: FieldValues) => FieldValues | FormData;
  form: UseFormReturn<T>;
  children: React.ReactNode;
}

const Form = <T extends object>({
  onHide,
  dataEdit,
  url,
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
      try {
        const formData: FieldValues | FormData = getFormData
          ? getFormData(data)
          : data;
        if (dataEdit?.id) {
          formData instanceof FormData
            ? await api.post(
                `${url || window.location.pathname}/${dataEdit.id}`,
                formData
              )
            : await api.put(
                `${url || window.location.pathname}/${dataEdit.id}`,
                formData
              );
          Toast.fire({
            icon: "success",
            title: "Success",
          });
        } else {
          await api.post(`${url || location.pathname}`, formData);
          Toast.fire({
            icon: "success",
            title: "Success",
          });
        }
        onRefreshTable && onRefreshTable(true);
        handleHide();
      } catch (error) {
        Swal.fire("Opss...", "Error", "error");
      } finally {
        setShowLoading(false);
      }
    },
    [dataEdit, url, location, getFormData, handleHide, onRefreshTable]
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
      <form onSubmit={form.handleSubmit(onSubmit || handleSubmitData)}>
        {children}
      </form>
      <Loading show={showLoading} />
    </>
  );
};

export default Form;
