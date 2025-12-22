// 🔑 Chart.js AUTO registration (PRODUCTION SAFE)
// MUST be the very first import
import "chart.js/auto";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard Context
import { MaterialUIControllerProvider } from "context";
import { AuthContextProvider } from "context/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
