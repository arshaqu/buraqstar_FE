import { CartProvider } from "react-use-cart";
import "./App.css";
import AppRoutes from "./Routes";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language; 
    document.body.dir = i18n.language === "ar" || i18n.language === "ur" ? "rtl" : "ltr"; 
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;
