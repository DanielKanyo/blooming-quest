import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { MantineProvider } from "@mantine/core";

import App from "./App.tsx";
import { theme } from "./Configs/Theme/Theme.ts";
import store from "./Store/Store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                <Provider store={store}>
                    <App />
                </Provider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);
