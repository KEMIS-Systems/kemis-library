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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dropzone_1 = require("react-dropzone");
const ai_1 = require("react-icons/ai");
const Dropzone = ({ accept, maxFiles, invalid, onChange }) => {
    // const { language } = useLanguage();
    const { acceptedFiles, getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({
        accept: accept,
        maxFiles: maxFiles,
    });
    (0, react_1.useEffect)(() => {
        if (onChange) {
            onChange(acceptedFiles);
        }
    }, [acceptedFiles, onChange]);
    return (react_1.default.createElement("div", Object.assign({}, getRootProps({
        className: `border border-1 bg-bray-200 py-8 px-5 flex flex-col justify-center items-center bg-stone-100 mb-2 rounded-lg ${invalid && "border-red-500"}`,
    })),
        react_1.default.createElement("input", Object.assign({}, getInputProps())),
        react_1.default.createElement(ai_1.AiOutlineCloudUpload, { size: "40" }),
        react_1.default.createElement("p", { className: "cursor-pointer text-center font-semibold text-gray-500" }, "Drop files here to upload or click to select files"),
        acceptedFiles.length > 0 && (react_1.default.createElement("div", { className: "flex flex-col gap-2 text-xs mt-5 text-blue-400" }, acceptedFiles.map((file) => {
            const i = Math.floor(Math.log(file.size) / Math.log(1024));
            return (react_1.default.createElement("div", { key: file.name, className: "flex gap-2 items-center" },
                react_1.default.createElement("span", null, file.name),
                react_1.default.createElement("span", { className: "text-sm font-bold" },
                    parseFloat((file.size / Math.pow(1024, i)).toFixed(2)),
                    " Kb")));
        })))));
};
exports.default = Dropzone;
//# sourceMappingURL=index.js.map