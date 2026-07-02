import type { Preview } from "@storybook/react";
import React from "react";
import { KemisProvider } from "../src/components/KemisProvider";
import "../src/styles/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <KemisProvider>
        <div className="p-4">
          <Story />
        </div>
      </KemisProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
