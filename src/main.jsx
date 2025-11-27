import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { initParticles } from "./particles";

// Initialize particles
initParticles();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
