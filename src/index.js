import "@shopify/polaris/build/esm/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

const theme = {
    colors: {
        surface: "#",
        onSurface: "#",
        interactive: "#",
        secondary: "#",
        primary: "#",
        critical: "#",
        warning: "#",
        highlight: "#",
        success: "#29274c",
        decorative: "#",
    },
    colorScheme: "dark"
};

ReactDOM.render(
    <AppProvider i18n={enTranslations} theme={theme}>
        <App />
    </AppProvider>,
    document.getElementById("root")
);