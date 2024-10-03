import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_en from "./translations/en/translate.json";
import common_ar from "./translations/ar/translate.json";
import { getLocalStorageData } from "./shared/commonFunction.js";
import { store } from "./store";
import { Provider } from "react-redux";
import Toast from "./shared/sharedComponents/ToasterMessage/ToasterMessage.jsx";
import "sweetalert2/src/sweetalert2.scss";
import "./assets/css/responsive.scss";

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
// Add a class to the body based on the language
if (defaultLanguage === "ar") {
  document.body.classList.add("font-arabic");
  document.body.classList.remove("font-english");
} else {
  document.body.classList.add("font-english");
  document.body.classList.remove("font-arabic");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  </I18nextProvider>
);
