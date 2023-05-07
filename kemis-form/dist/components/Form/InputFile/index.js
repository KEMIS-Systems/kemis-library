"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const utils_1 = require("primereact/utils");
const Dropzone_1 = __importDefault(require("~/components/Dropzone"));
const InputFile = ({ className, name, accept, maxFiles, handleChange, rules, form, }) => {
    const [fileChanged, setFileChanged] = react_1.default.useState(false);
    return (react_1.default.createElement("div", { className: 'mb-5 ' + (className !== undefined && className) }, form && (react_1.default.createElement(react_hook_form_1.Controller, { name: name, control: form.control, rules: rules, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (_a) => {
            var _b = _a.field, { ref, onChange } = _b, field = __rest(_b, ["ref", "onChange"]), { fieldState } = _a;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Dropzone_1.default, Object.assign({ accept: accept, maxFiles: maxFiles, className: (0, utils_1.classNames)({ 'p-invalid ': fieldState.error }), invalid: !!fieldState.error }, field, { onChange: (e) => {
                        if (!fileChanged && e.length > 0) {
                            setFileChanged(true);
                            onChange(e);
                        }
                        handleChange && handleChange(e);
                    } })),
                fieldState.error && (react_1.default.createElement("small", { className: "p-error" }, fieldState.error.message))));
        } }))));
};
exports.default = InputFile;
//# sourceMappingURL=index.js.map