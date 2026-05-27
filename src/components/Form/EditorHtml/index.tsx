import { Editor } from "primereact/editor";
import { classNames } from "primereact/utils";
import React from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  disabled?: boolean;
  headerTemplate?: React.ReactNode;
}

const EditorHtml = <T extends object>({
  className,
  name,
  label,
  rules,
  autoFocus,
  form,
  disabled,
  headerTemplate,
}: IProps<T>) => {
  //AUX Variable
  const DEFAULT_HEADER_TEMPLATE = (
    <div id="toolbar">
      <span className="ql-formats" data-pc-section="formats">
        <select className="ql-header hidden" data-pc-section="header">
          <option value="1" data-pc-section="option">
            Heading
          </option>
          <option value="2" data-pc-section="option">
            Subheading
          </option>
          <option value="0" data-pc-section="option" selected={false}>
            Normal
          </option>
        </select>
        <select className="ql-font hidden" data-pc-section="font">
          <option data-pc-section="option"></option>
          <option value="serif" data-pc-section="option"></option>
          <option value="monospace" data-pc-section="option"></option>
        </select>
      </span>

      <span className="ql-formats" data-pc-section="formats">
        <button type="button" className="ql-bold" aria-label="Bold" data-pc-section="bold">
          <svg viewBox="0 0 18 18">
            <path
              className="ql-stroke"
              d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
            ></path>
            <path
              className="ql-stroke"
              d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
            ></path>
          </svg>
        </button>
        <button type="button" className="ql-italic" aria-label="Italic" data-pc-section="italic">
          <svg viewBox="0 0 18 18">
            <line className="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line>
            <line className="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line>
            <line className="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line>
          </svg>
        </button>
        <button
          type="button"
          className="ql-underline"
          aria-label="Underline"
          data-pc-section="underline"
        >
          <svg viewBox="0 0 18 18">
            <path
              className="ql-stroke"
              d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
            ></path>
            <rect className="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect>
          </svg>
        </button>
      </span>

      <span className="ql-formats" data-pc-section="formats">
        <span className="ql-color ql-picker ql-color-picker" data-pc-section="color">
          <span
            className="ql-picker-options"
            aria-hidden="true"
            tabIndex={-1}
            id="ql-picker-options-2"
          >
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-selected ql-primary"
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-primary"
              data-value="#e60000"
              style={{
                backgroundColor: "rgb(230, 0, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-primary"
              data-value="#ff9900"
              style={{
                backgroundColor: "rgb(255, 153, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-primary"
              data-value="#ffff00"
              style={{
                backgroundColor: "rgb(255, 255, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-primary"
              data-value="#008a00"
              style={{
                backgroundColor: "rgb(0, 138, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-primary"
              data-value="#0066cc"
              style={{
                backgroundColor: "rgb(0, 102, 204)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item ql-primary"
              data-value="#9933ff"
              style={{
                backgroundColor: "rgb(153, 51, 255)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#ffffff"
              style={{
                backgroundColor: "rgb(255, 255, 255)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#facccc"
              style={{
                backgroundColor: "rgb(250, 204, 204)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#ffebcc"
              style={{
                backgroundColor: "rgb(255, 235, 204)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#ffffcc"
              style={{
                backgroundColor: "rgb(255, 255, 204)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#cce8cc"
              style={{
                backgroundColor: "rgb(204, 232, 204)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#cce0f5"
              style={{
                backgroundColor: "rgb(204, 224, 245)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#ebd6ff"
              style={{
                backgroundColor: "rgb(235, 214, 255)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#bbbbbb"
              style={{
                backgroundColor: "rgb(187, 187, 187)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#f06666"
              style={{
                backgroundColor: "rgb(240, 102, 102)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#ffc266"
              style={{
                backgroundColor: "rgb(255, 194, 102)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#ffff66"
              style={{
                backgroundColor: "rgb(255, 255, 102)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#66b966"
              style={{
                backgroundColor: "rgb(102, 185, 102)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#66a3e0"
              style={{
                backgroundColor: "rgb(102, 163, 224)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#c285ff"
              style={{
                backgroundColor: "rgb(194, 133, 255)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#888888"
              style={{
                backgroundColor: "rgb(136, 136, 136)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#a10000"
              style={{
                backgroundColor: "rgb(161, 0, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#b26b00"
              style={{
                backgroundColor: "rgb(178, 107, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#b2b200"
              style={{
                backgroundColor: "rgb(178, 178, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#006100"
              style={{
                backgroundColor: "rgb(0, 97, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#0047b2"
              style={{
                backgroundColor: "rgb(0, 71, 178)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#6b24b2"
              style={{
                backgroundColor: "rgb(107, 36, 178)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#444444"
              style={{
                backgroundColor: "rgb(68, 68, 68)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#5c0000"
              style={{
                backgroundColor: "rgb(92, 0, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#663d00"
              style={{
                backgroundColor: "rgb(102, 61, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#666600"
              style={{
                backgroundColor: "rgb(102, 102, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#003700"
              style={{
                backgroundColor: "rgb(0, 55, 0)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#002966"
              style={{
                backgroundColor: "rgb(0, 41, 102)",
              }}
            ></span>
            <span
              tabIndex={0}
              role="button"
              className="ql-picker-item"
              data-value="#3d1466"
              style={{
                backgroundColor: "rgb(61, 20, 102)",
              }}
            ></span>
          </span>
        </span>
        <select className="ql-color hidden" data-pc-section="color">
          <option selected={true}></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
          <option value="#9933ff"></option>
          <option value="#ffffff"></option>
          <option value="#facccc"></option>
          <option value="#ffebcc"></option>
          <option value="#ffffcc"></option>
          <option value="#cce8cc"></option>
          <option value="#cce0f5"></option>
          <option value="#ebd6ff"></option>
          <option value="#bbbbbb"></option>
          <option value="#f06666"></option>
          <option value="#ffc266"></option>
          <option value="#ffff66"></option>
          <option value="#66b966"></option>
          <option value="#66a3e0"></option>
          <option value="#c285ff"></option>
          <option value="#888888"></option>
          <option value="#a10000"></option>
          <option value="#b26b00"></option>
          <option value="#b2b200"></option>
          <option value="#006100"></option>
          <option value="#0047b2"></option>
          <option value="#6b24b2"></option>
          <option value="#444444"></option>
          <option value="#5c0000"></option>
          <option value="#663d00"></option>
          <option value="#666600"></option>
          <option value="#003700"></option>
          <option value="#002966"></option>
          <option value="#3d1466"></option>
        </select>
        <select className="ql-background hidden" data-pc-section="background">
          <option value="#000000"></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
          <option value="#9933ff"></option>
          <option selected={true}></option>
          <option value="#facccc"></option>
          <option value="#ffebcc"></option>
          <option value="#ffffcc"></option>
          <option value="#cce8cc"></option>
          <option value="#cce0f5"></option>
          <option value="#ebd6ff"></option>
          <option value="#bbbbbb"></option>
          <option value="#f06666"></option>
          <option value="#ffc266"></option>
          <option value="#ffff66"></option>
          <option value="#66b966"></option>
          <option value="#66a3e0"></option>
          <option value="#c285ff"></option>
          <option value="#888888"></option>
          <option value="#a10000"></option>
          <option value="#b26b00"></option>
          <option value="#b2b200"></option>
          <option value="#006100"></option>
          <option value="#0047b2"></option>
          <option value="#6b24b2"></option>
          <option value="#444444"></option>
          <option value="#5c0000"></option>
          <option value="#663d00"></option>
          <option value="#666600"></option>
          <option value="#003700"></option>
          <option value="#002966"></option>
          <option value="#3d1466"></option>
        </select>
      </span>

      <span className="ql-formats" data-pc-section="formats">
        <button
          type="button"
          className="ql-list"
          value="ordered"
          aria-label="Ordered List"
          data-pc-section="list"
          aria-pressed="false"
        >
          <svg viewBox="0 0 18 18">
            <line className="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line>
            <line className="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line>
            <line className="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line>
            <line className="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line>
            <path
              className="ql-fill"
              d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
            ></path>
            <path
              className="ql-stroke ql-thin"
              d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
            ></path>
            <path
              className="ql-stroke ql-thin"
              d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="ql-list"
          value="bullet"
          aria-label="Unordered List"
          data-pc-section="list"
          aria-pressed="false"
        >
          <svg viewBox="0 0 18 18">
            <line className="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line>
            <line className="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line>
            <line className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line>
            <line className="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line>
            <line className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line>
            <line className="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line>
          </svg>
        </button>

        <select className="ql-align hidden" data-pc-section="select">
          <option data-pc-section="option"></option>
          <option value="center" data-pc-section="option"></option>
          <option value="right" data-pc-section="option"></option>
          <option value="justify" data-pc-section="option"></option>
        </select>
      </span>

      <span className="ql-formats" data-pc-section="formats">
        <button
          type="button"
          className="ql-link"
          aria-label="Insert Link"
          data-pc-section="link"
          aria-pressed="false"
        >
          <svg viewBox="0 0 18 18">
            <line className="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line>
            <path
              className="ql-even ql-stroke"
              d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
            ></path>
            <path
              className="ql-even ql-stroke"
              d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="ql-code-block"
          aria-label="Insert Code Block"
          data-pc-section="codeblock"
          aria-pressed="false"
        >
          <svg viewBox="0 0 18 18">
            <polyline className="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline>
            <polyline className="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline>
            <line className="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line>
          </svg>
        </button>
      </span>

      <span className="ql-formats" data-pc-section="formats">
        <button
          type="button"
          className="ql-clean"
          aria-label="Remove Styles"
          data-pc-section="clean"
          aria-pressed="false"
        >
          <svg className="" viewBox="0 0 18 18">
            <line className="ql-stroke" x1="5" x2="13" y1="3" y2="3"></line>
            <line className="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"></line>
            <line className="ql-stroke" x1="11" x2="15" y1="11" y2="15"></line>
            <line className="ql-stroke" x1="15" x2="11" y1="11" y2="15"></line>
            <rect className="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"></rect>
          </svg>
        </button>
      </span>
    </div>
  );

  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={rules}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "text-red-400 ": fieldState.error }) + " block"}
                >
                  {label}
                  {rules?.required ? <span className="text-slate-300"> *</span> : ""}
                </label>
                <Editor
                  id={field.name}
                  style={{ height: "120px" }}
                  className={
                    classNames({ "p-invalid ": fieldState.error }) + " w-full disabled:bg-slate-100"
                  }
                  autoFocus={autoFocus}
                  disabled={disabled}
                  {...field}
                  onTextChange={(e) => {
                    field.onChange(e.htmlValue);
                  }}
                  headerTemplate={headerTemplate || DEFAULT_HEADER_TEMPLATE}
                />
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default EditorHtml;
