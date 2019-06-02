import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";

// addLocaleData([...en, ...de]);
// const { locale, messages } = window.App;

ReactDOM.render(
  <Provider store={store}>
    {/* <IntlProvider locale={locale} messages={messages}> */}
      <App />
    {/* </IntlProvider> */}
  </Provider>,
  document.getElementById("root")
);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
