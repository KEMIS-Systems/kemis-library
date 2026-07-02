import type { ReactNode } from "react";

export type KemisProviderProps = {
  children: ReactNode;
  /** Default locale code (e.g., "pt-BR", "en-US"). Passed through to the i18n provider. */
  locale?: string;
  /** PrimeReact 10 theme name (CSS file under primereact/resources/themes/<name>/theme.css). Defaults to "lara-light-blue". */
  theme?: string;
};
