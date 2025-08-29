import { createBrowserRouter } from "react-router-dom";

// Layouts
import { DefaultLayout } from "@src/layouts/default";

// Pages
import { Guide } from "@src/pages/guide";
import { Form } from "@src/pages/guide/pages/Form";
import { Home } from "../pages/Home/index";

// Utils
import { getPrevNextPage } from "./utils/functions/getPrevNextPage";


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
            },
            {
                path: "form",
                children: [
                    {
                        path: 'input-date',
                        Component: Form.InputDate,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputDate')
                        })
                    },
                    {
                        path: 'auto-complete',
                        Component: Form.AutoComplete,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'AutoComplete')
                        })
                    },
                    {
                        path: 'check-box',
                        Component: Form.CheckBox,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'CheckBox')
                        })
                    },
                    {
                        path: 'chips',
                        Component: Form.Chips,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'Chips')
                        })
                    },
                    {
                        path: 'dropdown',
                        Component: Form.Dropdown,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'Dropdown')
                        })
                    },
                    {
                        path: 'editor-html',
                        Component: Form.EditorHtml,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'EditorHtml')
                        })
                    },
                    {
                        path: 'form',
                        Component: Form.Form,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'Form')
                        })
                    },
                    {
                        path: 'form-dialog',
                        Component: Form.FormDialog,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'FormDialog')
                        })
                    },
                    {
                        path: 'input-cell-phone',
                        Component: Form.InputCellPhone,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputCellPhone')
                        })
                    },
                    {
                        path: 'input-file',
                        Component: Form.InputFile,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputFile')
                        })
                    },
                    {
                        path: 'input-image',
                        Component: Form.InputImage,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputImage')
                        })
                    },
                    {
                        path: 'input-mask',
                        Component: Form.InputMask,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputMask')
                        })
                    },
                    {
                        path: 'input-number',
                        Component: Form.InputNumber,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputNumber')
                        })
                    },
                    {
                        path: 'input-password',
                        Component: Form.InputPassword,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputPassword')
                        })
                    },
                    {
                        path: 'input-switch',
                        Component: Form.InputSwitch,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputSwitch')
                        })
                    },
                    {
                        path: 'input-text',
                        Component: Form.InputText,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputText')
                        })
                    },
                    {
                        path: 'input-text-area',
                        Component: Form.InputTextArea,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'InputTextArea')
                        })
                    },
                    {
                        path: 'list-box',
                        Component: Form.ListBox,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'ListBox')
                        })
                    },
                    {
                        path: 'message-error',
                        Component: Form.MessageError,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'MessageError')
                        })
                    },
                    {
                        path: 'multi-select',
                        Component: Form.MultiSelect,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'MultiSelect')
                        })
                    },
                    {
                        path: 'radio-button',
                        Component: Form.RadioButton,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'RadioButton')
                        })
                    },
                    {
                        path: 'select-button',
                        Component: Form.SelectButton,
                        loader: () => ({
                            pages: getPrevNextPage('Form', 'SelectButton')
                        })
                    }
                ]
            }
        ]
    },

])