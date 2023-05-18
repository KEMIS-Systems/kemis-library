import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { ILanguage } from './languages';
import api from '~/services/api';

interface LanguageContextData {
  language: ILanguage;
  idiom: string;
  locale: string;
  handleSelectIdiom(idiom: string): void;
}

export const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData
);

interface IProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: IProps) => {
  const router = useRouter();
  const [idiom, setIdiom] = useState(() => {
    let lang = router.locale;

    if (typeof window !== 'undefined') {
      if (lang !== 'en' && lang !== 'es') {
        lang = localStorage.getItem('KEMISERP:language') || 'pt';
      }
      const element = document.getElementsByTagName('html');
      element[0].lang = lang;
    }

    return lang || 'pt';
  });
  const [locale, setLocale] = useState('pt_BR');

  useEffect(() => {
    const idiomSelected = router.locale || 'pt_BR';
    if (idiomSelected[0].length === 2) {
      setIdiom(idiomSelected[0]);
      let local = 'pt-BR';
      if (idiom === 'en') {
        local = 'en-US';
      } else if (idiom === 'es') {
        local = 'es-AR';
      }
      setLocale(local);
    }
  }, [router, idiom]);

  const handleSelectIdiom = useCallback(
    (idiomSelected: string) => {
      setIdiom(idiomSelected);
      const element = document.getElementsByTagName('html');
      element[0].lang = idiomSelected;

      let local = 'pt-BR';
      if (idiom === 'en') {
        local = 'en-US';
      } else if (idiom === 'es') {
        local = 'es-AR';
      }
      setLocale(local);
      router.push(router.pathname, router.pathname, {
        locale: idiomSelected,
      });
    },
    [router, idiom]
  );

  const language = useMemo(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('KEMISERP:language', idiom);
    }
    return require(`./languages/${idiom}`);
  }, [idiom]);

  useEffect(() => {
    api.defaults.headers.common['frontLanguage'] = idiom;
  }, [idiom]);

  const paramsProvider = useMemo(() => {
    return {
      language,
      handleSelectIdiom,
      idiom,
      locale,
    };
  }, [language, handleSelectIdiom, idiom, locale]);

  return (
    <LanguageContext.Provider value={paramsProvider}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextData {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within an LanguageProvider');
  }

  return context;
}
