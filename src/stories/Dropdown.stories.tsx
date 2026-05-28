import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../components/Form/Dropdown";

const meta: Meta = {
  title: "Form/Dropdown",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { status: string };

const OPTIONS = [
  { label: "Ativo", value: "ativo" },
  { label: "Inativo", value: "inativo" },
  { label: "Pendente", value: "pendente" },
];

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { status: "" } });
    return <Dropdown<FormValues> name="status" label="Status" form={form} options={OPTIONS} />;
  },
};

export const Required: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { status: "" } });
    return (
      <Dropdown<FormValues>
        name="status"
        label="Status"
        form={form}
        options={OPTIONS}
        rules={{ required: "Selecione um status" }}
      />
    );
  },
};
