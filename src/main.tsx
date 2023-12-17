import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
// Order seems to matter. If Mantine is imported after tailwind, the tailwind class passed with className is not applied.
import "@mantine/core/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
