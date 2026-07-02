import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "../components/Form/MultiSelect";

const meta: Meta = {
  title: "Form/MultiSelect",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { tags: string[] };

const OPTIONS = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
];

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { tags: [] } });
    return (
      <MultiSelect<FormValues> name="tags" label="Tecnologias" form={form} options={OPTIONS} />
    );
  },
};

export const Required: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { tags: [] } });
    return (
      <MultiSelect<FormValues>
        name="tags"
        label="Tecnologias"
        form={form}
        options={OPTIONS}
        rules={{ required: "Selecione ao menos uma tecnologia" }}
      />
    );
  },
};
