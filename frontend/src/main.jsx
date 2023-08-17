import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { WorkoutProvider } from "./contexts/WorkoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutProvider>
      <Router>
        <App />
      </Router>
    </WorkoutProvider>
  </React.StrictMode>
);
