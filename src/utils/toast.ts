import { confirmDialog } from "primereact/confirmdialog";

import { toastRef } from "../components/KemisProvider/refs";

type Severity = "success" | "info" | "warn" | "error";

type ToastOptions = {
  title?: string;
  message: string;
  durationMs?: number;
};

type ConfirmOptions = {
  title?: string;
  message: string;
  acceptLabel?: string;
  rejectLabel?: string;
  onAccept?: () => void;
  onReject?: () => void;
};

/**
 * Maps a Swal-style icon name to a PrimeReact severity.
 * Kept for backward-compat with any external callers using `.fire({ icon })`.
 */
function toSeverity(icon: string): Severity {
  if (icon === "warning") return "warn";
  if (icon === "success" || icon === "info" || icon === "error") return icon;
  return "info";
}

function show(severity: Severity, opts: ToastOptions) {
  if (!toastRef.current) {
    console.warn(
      "[kemis-library] Toast called before <KemisProvider /> mounted; message dropped:",
      opts.message
    );
    return;
  }
  toastRef.current.show({
    severity,
    summary: opts.title,
    detail: opts.message,
    life: opts.durationMs ?? 3000,
  });
}

/**
 * Backward-compat shim for the old `Toast.fire({ icon, title, text })` Swal API.
 * External callers that used the mixin's `.fire()` will continue to work.
 */
type SwalFireOptions = {
  icon?: string;
  title?: string;
  text?: string;
  durationMs?: number;
};

function fire(opts: SwalFireOptions) {
  show(toSeverity(opts.icon ?? "info"), {
    title: opts.title,
    message: opts.text ?? opts.title ?? "",
    durationMs: opts.durationMs,
  });
}

const Toast = {
  /** Show a success toast. */
  success: (opts: ToastOptions) => show("success", opts),
  /** Show an info toast. */
  info: (opts: ToastOptions) => show("info", opts),
  /** Show a warning toast. */
  warning: (opts: ToastOptions) => show("warn", opts),
  /** Show an error toast. */
  error: (opts: ToastOptions) => show("error", opts),
  /**
   * Show an imperative confirm dialog.
   * Replaces Swal.fire({ showCancelButton: true, ... }).
   */
  confirm: (opts: ConfirmOptions) =>
    confirmDialog({
      header: opts.title,
      message: opts.message,
      acceptLabel: opts.acceptLabel ?? "OK",
      rejectLabel: opts.rejectLabel ?? "Cancel",
      accept: opts.onAccept,
      reject: opts.onReject,
    }),
  /**
   * Backward-compat shim for `Toast.fire({ icon, title, text })`.
   * @deprecated Use Toast.success / .info / .warning / .error instead.
   */
  fire,
};

export default Toast;
