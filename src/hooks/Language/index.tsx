import { ILanguage } from "./languages";

export interface LanguageContextData {
  language: ILanguage;
}

export function useLanguage(): ILanguage {
  let idiom = "";
  // TIP: window !== undefined is the same as typeof window !== "undefined"
  if (window !== undefined) idiom = window.location.pathname.slice(1, 3);
  if (idiom !== "pt" && idiom !== "en" && idiom !== "es") idiom = "pt";

  const language = require(`./languages/${idiom}`);

  return language;
}
