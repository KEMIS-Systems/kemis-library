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
const Loading_1 = __importDefault(require("~/components/Loading"));
const api_1 = __importDefault(require("~/services/api"));
const toast_1 = __importDefault(require("~/utils/toast"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const react_router_dom_1 = require("react-router-dom");
const Form = ({ onHide, dataEdit, url, submit, onRefreshTable, onSubmit, getFormData, form, children, }) => {
    const location = (0, react_router_dom_1.useLocation)();
    // const { language } = useLanguage();
    const [showLoading, setShowLoading] = (0, react_1.useState)(false);
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const handleHide = (0, react_1.useCallback)(() => {
        form.reset();
        onHide && onHide();
    }, [onHide, form]);
    const handleSubmitData = (0, react_1.useCallback)((data) => __awaiter(void 0, void 0, void 0, function* () {
        setShowLoading(true);
        try {
            const formData = getFormData
                ? getFormData(data)
                : data;
            if (dataEdit === null || dataEdit === void 0 ? void 0 : dataEdit.id) {
                formData instanceof FormData
                    ? yield api_1.default.post(`${url || location.pathname}/${dataEdit.id}`, formData)
                    : yield api_1.default.put(`${url || location.pathname}/${dataEdit.id}`, formData);
                toast_1.default.fire({
                    icon: "success",
                    title: "Success",
                });
            }
            else {
                yield api_1.default.post(`${url || location.pathname}`, formData);
                toast_1.default.fire({
                    icon: "success",
                    title: "Success",
                });
            }
            onRefreshTable && onRefreshTable(true);
            handleHide();
        }
        catch (error) {
            sweetalert2_1.default.fire("Opss...", "Error", "error");
        }
        finally {
            setShowLoading(false);
        }
    }), [dataEdit, url, location, getFormData, handleHide, onRefreshTable]);
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