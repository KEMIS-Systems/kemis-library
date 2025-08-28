import { createBrowserRouter } from "react-router-dom";

// Pages
import { Form } from "../pages/Form";
import { Home } from "../pages/Home/index";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/form',
        Component: Form,
    },

])