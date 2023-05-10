import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProviderState from "./Context/StateContext";
import Layout from "./Components/Layout";
import "./App.css";
import NoteItem from "./Components/NoteItem";
import EditNote from "./Pages/EditNote";
import Home from "./Pages/Home";
import NewNote from "./Pages/NewNote";
import NoteItemLayout from "./Pages/NoteItemLayout";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderState>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </ProviderState>
    </BrowserRouter>
  </React.StrictMode>
);
