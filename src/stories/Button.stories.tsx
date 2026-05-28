import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    text: "Salvar",
    type: "button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Submit: Story = {
  args: {
    text: "Enviar",
    type: "submit",
  },
};
