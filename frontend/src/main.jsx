import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import { UserProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <WorkoutProvider>
      <Router>
        <App />
      </Router>
    </WorkoutProvider>
    </UserProvider>
  </React.StrictMode>
);
