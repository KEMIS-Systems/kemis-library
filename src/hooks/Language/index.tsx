import { ILanguage } from "./languages";

interface LanguageContextData {
  language: ILanguage;
}

export const Language = {} as LanguageContextData;

export const LanguageContextData = () => {
  const language = () => {
    let idiom = window.location.pathname.slice(0, 3);
    if (idiom === null || idiom === undefined || idiom === "") idiom = "pt";
    return require(`./languages/${idiom}`);
  };

  return language;
};

export function useLanguage(): LanguageContextData {
  const language = Language;

  return language;
}
