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
const dropdown_1 = require("primereact/dropdown");
const utils_1 = require("primereact/utils");
const button_1 = require("primereact/button");
const Dropdown = ({ className, name, label, form, options, selected, rules, autoFocus, handleAddButton, disabled, }) => {
    return (react_1.default.createElement("div", { className: 'mb-5 ' + (className !== undefined && className) }, form && (react_1.default.createElement(react_hook_form_1.Controller, { name: name, control: form.control, rules: rules, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (_a) => {
            var _b = _a.field, { ref } = _b, field = __rest(_b, ["ref"]), { fieldState } = _a;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("label", { htmlFor: field.name, className: (0, utils_1.classNames)({ 'text-red-400 ': fieldState.error }) + 'block' }, label),
                react_1.default.createElement("div", { className: `${handleAddButton && 'p-inputgroup'}` },
                    react_1.default.createElement(dropdown_1.Dropdown, Object.assign({ id: field.name, options: options, autoFocus: autoFocus, showClear: true, filter: true, className: (0, utils_1.classNames)({ 'p-invalid ': fieldState.error }) + 'w-full ', placeholder: selected }, field, { 
                        // ref={ref}
                        onChange: (event) => field.onChange(event.target.value) })),
                    handleAddButton && (react_1.default.createElement(button_1.Button, { type: "button", icon: "pi pi-plus", className: "p-button-success", disabled: disabled, onClick: () => handleAddButton(4) })))));
        } }))));
};
exports.default = Dropdown;
//# sourceMappingURL=index.js.map