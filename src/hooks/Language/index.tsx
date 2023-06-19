import { ILanguage } from "./languages";
import en from "./languages/en.json";
import es from "./languages/es.json";
import pt from "./languages/pt.json";

const languageData: { [key: string]: ILanguage } = {
  en,
  es,
  pt,
};

export interface LanguageContextData {
  language: ILanguage;
}

export function useLanguage(): LanguageContextData {
  let idiom = "";
  if (typeof window !== "undefined")
    idiom = window.location.pathname.slice(1, 3);
  if (idiom !== "pt" && idiom !== "en" && idiom !== "es") idiom = "pt";

  const language: ILanguage = languageData[idiom];

  return { language };
}
