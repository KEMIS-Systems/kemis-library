/**
 * Trigger a browser download for a Blob or URL.
 * Replaces `file-saver` (saveAs) with a tiny native equivalent.
 */
export function downloadFile(source: Blob | string, filename?: string): void {
  const url = typeof source === "string" ? source : URL.createObjectURL(source);
  const a = document.createElement("a");
  a.href = url;
  if (filename) {
    a.download = filename;
  }
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (typeof source !== "string") {
    // Revoke after the click so the browser has had a chance to grab the bytes.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}
