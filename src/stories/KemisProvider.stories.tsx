import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { KemisProvider } from "../components/KemisProvider";

const meta: Meta<typeof KemisProvider> = {
  title: "Core/KemisProvider",
  component: KemisProvider,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof KemisProvider>;

export const Default: Story = {
  render: () => (
    <KemisProvider>
      <p className="text-gray-700">KemisProvider is active. Toast and ConfirmDialog are mounted.</p>
    </KemisProvider>
  ),
};
