"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const Toast = sweetalert2_1.default.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', sweetalert2_1.default.stopTimer);
        toast.addEventListener('mouseleave', sweetalert2_1.default.resumeTimer);
    },
});
exports.default = Toast;
//# sourceMappingURL=toast.js.map