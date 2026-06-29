import "./index.css";
import App from "./App";
import React from "react";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./context/AuthContext";
import "primereact/resources/themes/lara-light-cyan/theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <PrimeReactProvider value={{ unstyled: false }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PrimeReactProvider>
);