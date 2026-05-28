import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import InputDate from "../components/Form/InputDate";

const meta: Meta = {
  title: "Form/InputDate",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { data: Date | null };

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { data: null } });
    return <InputDate<FormValues> name="data" label="Data" form={form} dateFormat="dd/mm/yy" />;
  },
};

export const WithTime: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { data: null } });
    return (
      <InputDate<FormValues>
        name="data"
        label="Data e Hora"
        form={form}
        showTime
        hourFormat="24"
        dateFormat="dd/mm/yy"
      />
    );
  },
};

export const MonthView: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { data: null } });
    return (
      <InputDate<FormValues> name="data" label="Mês" form={form} view="month" dateFormat="mm/yy" />
    );
  },
};
