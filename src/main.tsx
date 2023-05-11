import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProviderState from "./Context/StateContext";
import App from "./App";
import ModalContextProvider from "./Context/ModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalContextProvider>
      <BrowserRouter>
        <ProviderState>
          <Routes>
            <Route path="/*" element={<App />}></Route>
          </Routes>
        </ProviderState>
      </BrowserRouter>
    </ModalContextProvider>
  </React.StrictMode>
);
