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
const inputmask_1 = require("primereact/inputmask");
const InputMask = ({ className, name, label, mask, form, rules, autoFocus, onComplete, }) => {
    return (react_1.default.createElement("div", { className: "mb-5 " + (className !== undefined && className) }, form && (react_1.default.createElement(react_hook_form_1.Controller, { name: name, control: form.control, rules: rules, render: (_a) => {
            var _b = _a.field, { ref } = _b, field = __rest(_b, ["ref"]), { fieldState } = _a;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("label", { htmlFor: field.name, className: (0, utils_1.classNames)({ "text-red-400 ": fieldState.error }) + "block" }, label),
                react_1.default.createElement(inputmask_1.InputMask, Object.assign({ id: field.name, autoFocus: autoFocus, mask: mask, className: (0, utils_1.classNames)({ "p-invalid ": fieldState.error }) + "w-full" }, field, { ref: ref, onChange: (event) => field.onChange(event.value), onComplete: onComplete }))));
        } }))));
};
exports.default = InputMask;
//# sourceMappingURL=index.js.map