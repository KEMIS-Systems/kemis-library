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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const toast_1 = __importDefault(require("../../../utils/toast"));
const Loading_1 = __importDefault(require("../../Loading"));
/**
 * Displays a form with the specified fields. By default when submit it POST/PUT the data in the specified url.
 *
 * @children This component Must have a child element (ej: fields)
 * @param form to control the form data
 * @param onHide (optional) callback to control what happen when you close/restart/clean the form
 * @param api (optional) allows to make the POST/PUT request to our service/api
 * @param path (optional) path to POST/PUT our form data. Previusly you must include the 'api' property and specify your 'base_url' of the service you want to do the request.
 * @param dataEdit (optional) obj that include initial data to show in fields
 * @param onSubmit (optional) callback to change what happens on Submit
 * @param onRefreshTable (optional) callback to refresh data in other site (if needed)
 * @param getFormData (optional) callback which must returns the form data
 */
const Form = ({ api, onHide, dataEdit, path, submit, onRefreshTable, onSubmit, getFormData, form, children, }) => {
    const [showLoading, setShowLoading] = (0, react_1.useState)(false);
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const handleHide = (0, react_1.useCallback)(() => {
        form.reset();
        onHide && onHide();
    }, [onHide, form]);
    const handleSubmitData = (0, react_1.useCallback)((data) => __awaiter(void 0, void 0, void 0, function* () {
        setShowLoading(true);
        if (api) {
            try {
                const formData = getFormData
                    ? getFormData(data)
                    : data;
                if (dataEdit === null || dataEdit === void 0 ? void 0 : dataEdit.id) {
                    formData instanceof FormData
                        ? yield api.post(`${path}/${dataEdit.id}`, formData)
                        : yield api.put(`${path}/${dataEdit.id}`, formData);
                    toast_1.default.fire({
                        icon: "success",
                        title: "Success",
                    });
                }
                else {
                    yield api.post(`${path}`, formData);
                    toast_1.default.fire({
                        icon: "success",
                        title: "Success",
                    });
                }
                onRefreshTable && onRefreshTable(true);
                handleHide();
            }
            catch (error) {
                sweetalert2_1.default.fire({
                    title: "Opss...",
                    text: "Error",
                    icon: "error",
                    willOpen: (popup) => {
                        if (popup.parentElement) {
                            popup.parentElement.style.zIndex = "5000";
                        }
                    },
                });
            }
            finally {
                setShowLoading(false);
            }
        }
        else
            console.error("If you want to POST/PUT, you must include the 'api' property in Form component.");
    }), [dataEdit, path, location, getFormData, handleHide, onRefreshTable]);
    (0, react_1.useEffect)(() => {
        submit && setSubmitted(submit);
    }, [submit]);
    (0, react_1.useEffect)(() => {
        submitted && form.handleSubmit(onSubmit || handleSubmitData)();
        setSubmitted(false);
    }, [submitted, form, onSubmit, handleSubmitData]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("form", { onSubmit: form.handleSubmit(onSubmit || handleSubmitData) }, children),
        react_1.default.createElement(Loading_1.default, { show: showLoading })));
};
exports.default = Form;
//# sourceMappingURL=index.js.map