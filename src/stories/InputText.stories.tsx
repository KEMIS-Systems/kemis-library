import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import InputText from "../components/Form/InputText";

const meta: Meta = {
  title: "Form/InputText",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { nome: string };

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { nome: "" } });
    return (
      <InputText<FormValues> name="nome" label="Nome" form={form} placeholder="Digite seu nome" />
    );
  },
};

export const Required: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { nome: "" } });
    return (
      <InputText<FormValues>
        name="nome"
        label="Nome"
        form={form}
        rules={{ required: "Nome é obrigatório" }}
        placeholder="Campo obrigatório"
      />
    );
  },
};

export const Disabled: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { nome: "Valor fixo" } });
    return <InputText<FormValues> name="nome" label="Nome (desabilitado)" form={form} disabled />;
  },
};
