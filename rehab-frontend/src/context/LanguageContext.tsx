import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Lang } from '../i18n/translations';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string, vars?: Record<string, string>) => string;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    // Swap body font for Arabic
    document.body.style.fontFamily =
      lang === 'ar'
        ? "'Cairo', 'Inter', sans-serif"
        : "'Inter', sans-serif";
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));

  const t = (key: string, vars?: Record<string, string>): string => {
    const entry = translations[key];
    if (!entry) return key;
    let result = entry[lang] ?? entry.en ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      });
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isAr: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
