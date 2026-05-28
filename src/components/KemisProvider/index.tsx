import { PrimeReactProvider } from "primereact/api";
import { useMemo } from "react";
import { KemisContext, type KemisContextValue } from "./context";
import type { KemisProviderProps } from "./types";

// Note: The Language module only exposes a `useLanguage` hook (reads from
// window.location.pathname) and has no LanguageProvider component to wrap.
// The `locale` prop is stored in context and will be wired to i18n in a
// future task when a proper provider is available.

export function KemisProvider({ children, locale }: KemisProviderProps) {
  const value = useMemo<KemisContextValue>(() => ({}), [locale]);

  return (
    <PrimeReactProvider>
      <KemisContext.Provider value={value}>{children}</KemisContext.Provider>
    </PrimeReactProvider>
  );
}

export type { KemisProviderProps } from "./types";
