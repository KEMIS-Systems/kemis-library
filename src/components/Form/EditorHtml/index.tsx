import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import MessageError from "../MessageError";
import { cn } from "../../../utils";

interface IProps<T extends FieldValues> {
  className?: string;
  name: FieldPath<T>;
  label: string;
  rules?: RegisterOptions;
  autoFocus?: boolean;
  form: UseFormReturn<T>;
  disabled?: boolean;
  /** @deprecated headerTemplate is no longer used; toolbar is built-in via Tiptap */
  headerTemplate?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Minimal toolbar button helper
// ---------------------------------------------------------------------------
type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const ToolbarButton = ({ onClick, active, title, children, disabled }: ToolbarButtonProps) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    disabled={disabled}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={cn(
      "inline-flex items-center justify-center rounded px-1.5 py-0.5 text-sm transition-colors",
      active
        ? "bg-slate-200 text-slate-900"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      disabled && "cursor-not-allowed opacity-40"
    )}
  >
    {children}
  </button>
);

// ---------------------------------------------------------------------------
// Internal Tiptap editor sub-component
// ---------------------------------------------------------------------------
type TiptapEditorProps = {
  id?: string;
  value: string | null | undefined;
  onChange: (html: string | null) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  hasError?: boolean;
};

const TiptapEditor = ({
  id,
  value,
  onChange,
  disabled,
  autoFocus,
  hasError,
}: TiptapEditorProps) => {
  // Flag to avoid feedback loops when we programmatically set content
  const isSettingContent = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: value ?? "",
    editable: !disabled,
    autofocus: autoFocus ? "start" : false,
    onUpdate({ editor }) {
      if (isSettingContent.current) return;
      const html = editor.getHTML();
      // Emit null when the editor is empty (mirrors PrimeReact Editor behaviour)
      onChange(html === "<p></p>" ? null : html);
    },
    editorProps: {
      attributes: {
        id: id ?? "",
        class: cn(
          "min-h-[120px] px-3 py-2 focus:outline-none prose prose-sm max-w-none",
          disabled && "cursor-not-allowed opacity-60"
        ),
      },
    },
  });

  // Sync value when parent updates it externally
  useEffect(() => {
    if (!editor) return;
    const incoming = value ?? "";
    if (incoming !== editor.getHTML()) {
      isSettingContent.current = true;
      editor.commands.setContent(incoming);
      isSettingContent.current = false;
    }
  }, [editor, value]);

  // Keep editable flag in sync with disabled prop
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  const setLink = () => {
    const url = window.prompt("URL do link:");
    if (!url) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div
      className={cn(
        "rounded border",
        hasError ? "border-red-400" : "border-gray-300",
        disabled && "bg-slate-100"
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-gray-200 bg-gray-50 px-1 py-1">
        {/* Text style */}
        <ToolbarButton
          title="Negrito"
          active={editor?.isActive("bold")}
          disabled={disabled}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          title="Itálico"
          active={editor?.isActive("italic")}
          disabled={disabled}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          title="Sublinhado"
          active={editor?.isActive("underline")}
          disabled={disabled}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>

        <span className="mx-1 border-l border-gray-300" />

        {/* Lists */}
        <ToolbarButton
          title="Lista ordenada"
          active={editor?.isActive("orderedList")}
          disabled={disabled}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          {/* ordered list svg */}
          <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-current stroke-2">
            <line x1="7" x2="15" y1="4" y2="4" />
            <line x1="7" x2="15" y1="9" y2="9" />
            <line x1="7" x2="15" y1="14" y2="14" />
            <line x1="2.5" x2="4.5" y1="5.5" y2="5.5" strokeWidth="1" />
            <path
              strokeWidth="1"
              d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
            />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          title="Lista não-ordenada"
          active={editor?.isActive("bulletList")}
          disabled={disabled}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          {/* bullet list svg */}
          <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-current stroke-2">
            <line x1="6" x2="15" y1="4" y2="4" />
            <line x1="6" x2="15" y1="9" y2="9" />
            <line x1="6" x2="15" y1="14" y2="14" />
            <line x1="3" x2="3" y1="4" y2="4" />
            <line x1="3" x2="3" y1="9" y2="9" />
            <line x1="3" x2="3" y1="14" y2="14" />
          </svg>
        </ToolbarButton>

        <span className="mx-1 border-l border-gray-300" />

        {/* Link */}
        <ToolbarButton
          title="Inserir link"
          active={editor?.isActive("link")}
          disabled={disabled}
          onClick={setLink}
        >
          <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-current stroke-2">
            <line x1="7" x2="11" y1="7" y2="11" />
            <path d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z" />
            <path d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z" />
          </svg>
        </ToolbarButton>

        {/* Code block */}
        <ToolbarButton
          title="Bloco de código"
          active={editor?.isActive("codeBlock")}
          disabled={disabled}
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        >
          <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-current stroke-2">
            <polyline points="5 7 3 9 5 11" />
            <polyline points="13 7 15 9 13 11" />
            <line x1="10" x2="8" y1="5" y2="13" />
          </svg>
        </ToolbarButton>

        <span className="mx-1 border-l border-gray-300" />

        {/* Clear formatting */}
        <ToolbarButton
          title="Remover formatação"
          disabled={disabled}
          onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
        >
          <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-current stroke-2">
            <line x1="5" x2="13" y1="3" y2="3" />
            <line x1="6" x2="9.35" y1="12" y2="3" />
            <line x1="11" x2="15" y1="11" y2="15" />
            <line x1="15" x2="11" y1="11" y2="15" />
            <rect
              height="1"
              rx="0.5"
              ry="0.5"
              width="7"
              x="2"
              y="14"
              className="fill-current stroke-none"
            />
          </svg>
        </ToolbarButton>
      </div>

      {/* Content area */}
      <EditorContent editor={editor} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main exported component (react-hook-form controlled)
// ---------------------------------------------------------------------------
const EditorHtml = <T extends object>({
  className,
  name,
  label,
  rules,
  autoFocus,
  form,
  disabled,
}: IProps<T>) => {
  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name}
          control={form.control}
          rules={rules}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "text-red-400 ": fieldState.error }) + " block"}
              >
                {label}
                {rules?.required ? <span className="text-slate-300"> *</span> : ""}
              </label>
              <TiptapEditor
                id={field.name}
                value={field.value as string | null | undefined}
                onChange={field.onChange}
                disabled={disabled}
                autoFocus={autoFocus}
                hasError={!!fieldState.error}
              />
              {<MessageError fieldState={fieldState} />}
            </>
          )}
        />
      )}
    </div>
  );
};

export default EditorHtml;
