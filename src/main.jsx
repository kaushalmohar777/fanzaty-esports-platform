import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_en from "./translations/en/translate.json";
import common_ar from "./translations/ar/translate.json";
import { getLocalStorageData } from "./shared/commonFunction.js";

const defaultLanguage = getLocalStorageData("language") || "ar";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: defaultLanguage, // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    ar: {
      common: common_ar,
    },
  },
});
document.body.dir = defaultLanguage === "ar" ? "rtl" : "ltr";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
