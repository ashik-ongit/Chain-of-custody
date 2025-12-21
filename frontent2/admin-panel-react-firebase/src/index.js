import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// 🔑 Chart.js REQUIRED REGISTRATION (THIS FIXES BLANK ADMIN PAGE)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

// Material Dashboard 2 React Context Provider
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
