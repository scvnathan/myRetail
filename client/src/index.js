import React from "react";

import { render } from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise-middleware";
import { ThemeProvider } from "styled-components";
import thunk from "redux-thunk";
import App from "./App";
import rootReducer from "./features/reducers";
import theme from "./theme";

const store = createStore(rootReducer, compose(applyMiddleware(promiseMiddleware(), thunk)));

render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById("app")
);

if (module.hot) {
	module.hot.accept();
}