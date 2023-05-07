"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const dialog_1 = require("primereact/dialog");
const Dialog = ({ header, visible, className, footer, onHide, children, }) => {
    return (react_1.default.createElement(dialog_1.Dialog, { header: header, visible: visible, onHide: onHide, className: className, footer: footer }, children));
};
exports.default = Dialog;
//# sourceMappingURL=index.js.map