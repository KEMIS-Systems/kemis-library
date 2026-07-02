
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@src/App";

// @ts-ignore
const ReactRoot = createRoot(document.getElementById("app"));

ReactRoot.render(<StrictMode>
    <App />
</StrictMode>)