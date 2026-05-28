import type { Toast as PrimeToast } from "primereact/toast";
import { createRef, type RefObject } from "react";

/**
 * Module-level ref to the global Toast mounted by <KemisProvider />.
 * Used by utils/toast.ts to fire imperatively from outside the React tree.
 *
 * If <KemisProvider /> is not mounted, .current will be null and callers
 * should fall back to a console.warn (handled inside utils/toast.ts).
 */
export const toastRef: RefObject<PrimeToast> = createRef<PrimeToast>();
