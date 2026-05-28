import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import EditorHtml from "../components/Form/EditorHtml";

const meta: Meta = {
  title: "Form/EditorHtml",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { conteudo: string };

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { conteudo: "" } });
    return <EditorHtml<FormValues> name="conteudo" label="Conteúdo" form={form} />;
  },
};

export const WithInitialContent: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: { conteudo: "<p>Conteúdo <strong>inicial</strong> do editor.</p>" },
    });
    return <EditorHtml<FormValues> name="conteudo" label="Conteúdo" form={form} />;
  },
};

export const Disabled: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: { conteudo: "<p>Este editor está desabilitado.</p>" },
    });
    return (
      <EditorHtml<FormValues>
        name="conteudo"
        label="Conteúdo (desabilitado)"
        form={form}
        disabled
      />
    );
  },
};
