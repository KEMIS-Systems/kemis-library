import { createContext } from "react";

export type KemisContextValue = {
  /** Filled in Task 3 — toast/confirm imperative refs. */
  __placeholder?: never;
};

export const KemisContext = createContext<KemisContextValue>({});
