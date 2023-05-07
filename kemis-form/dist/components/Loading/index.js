"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("./styles");
function Loading({ show }) {
    return (react_1.default.createElement(react_1.default.Fragment, null, show && (react_1.default.createElement(styles_1.Container, { className: "loading-box" },
        react_1.default.createElement("div", { className: "loader", role: "status" })))));
}
exports.default = Loading;
//# sourceMappingURL=index.js.map