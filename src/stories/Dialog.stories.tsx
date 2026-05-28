import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button type="button" text="Abrir Dialog" onClick={() => setVisible(true)} />
        <Dialog
          header="Exemplo de Dialog"
          visible={visible}
          className="w-[500px]"
          onHide={() => setVisible(false)}
        >
          <p>Conteúdo do dialog.</p>
        </Dialog>
      </>
    );
  },
};
