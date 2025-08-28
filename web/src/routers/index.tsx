import { createBrowserRouter } from "react-router-dom";

// Layouts
import { DefaultLayout } from "@src/layouts/default";

// Pages
import { Guide } from "@src/pages/guide";
import { Home } from "../pages/Home/index";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/guide',
        Component: DefaultLayout,
        children: [
            {
                index: true,
                Component: Guide
            }
        ]
    },

])