import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonFr from "./locales/fr/common.json";
import homeFr from "./locales/fr/home.json";
import portfolioFr from "./locales/fr/portfolio.json";
import projectFr from "./locales/fr/project.json";
import commonEn from "./locales/en/common.json";
import homeEn from "./locales/en/home.json";
import portfolioEn from "./locales/en/portfolio.json";
import projectEn from "./locales/en/project.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    defaultNS: "common",
    ns: ["common", "home", "portfolio", "project"],
    resources: {
      fr: { common: commonFr, home: homeFr, portfolio: portfolioFr, project: projectFr },
      en: { common: commonEn, home: homeEn, portfolio: portfolioEn, project: projectEn },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
