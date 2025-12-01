// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ExpenseProvider } from "./context/ExpenseContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/REACT_251201/">
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
