"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Form_1 = __importDefault(require("../Form"));
const Dialog_1 = __importDefault(require("../../Dialog"));
/**
 * Displays a form with the specified fields within a modal window. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param header modal header/title
 * @param form to control the form data
 * @param onHide callback to control what happen when you close the modal window
 * @param visible boolean to control the Modal visibility
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param path (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 * @param classNameDialog (optional) to add modal styles
 */
const FormDialog = ({ api, onHide, dataEdit, url, onRefreshTable, onSubmit, getFormData, form, header, visible, classNameDialog, children, }) => {
    // const { language } = useLanguage();
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const handleHide = (0, react_1.useCallback)(() => {
        form.reset();
        onHide();
    }, [onHide, form]);
    const footerContent = (0, react_1.useCallback)(() => (react_1.default.createElement("div", { className: "flex justify-end gap-3" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { type: "button", className: "bg-light text-white py-2 px-4 rounded-lg font-bold", onClick: () => handleHide() }, "Cancel")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { type: "submit", className: "bg-primary text-white py-2 px-4 rounded-lg font-bold", onClick: () => {
                    setSubmitted(true);
                    setTimeout(() => {
                        setSubmitted(false);
                    }, 1000);
                } }, "Save")))), [handleHide]);
    return (react_1.default.createElement(Dialog_1.default, { header: header, visible: visible, className: `w-full ${classNameDialog}`, footer: footerContent, onHide: handleHide },
        react_1.default.createElement(Form_1.default, { api: api, onHide: handleHide, dataEdit: dataEdit, path: url, submit: submitted, onSubmit: onSubmit, getFormData: getFormData, onRefreshTable: onRefreshTable, form: form }, children)));
};
exports.default = FormDialog;
//# sourceMappingURL=index.js.map