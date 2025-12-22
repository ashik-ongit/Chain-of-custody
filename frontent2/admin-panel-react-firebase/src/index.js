import "./utils/chartjs";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard Context
import { MaterialUIControllerProvider } from "context";
import { AuthContextProvider } from "context/AuthContext";

// ✅ Chart.js FIX (THIS IS THE KEY)
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

// 🔑 Register ALL required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

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
