import { RouterProvider } from "react-router-dom";

// Routers
import { Router } from "./routers";

// Global Styles
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import "./styles/components.css";
import "./styles/fonts/index.css";
import "./styles/global/base.css";
import "./styles/global/index.css";

export function App() {
    return <RouterProvider router={Router} />
}