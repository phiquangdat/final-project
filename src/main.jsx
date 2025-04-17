import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BudgetProvider, { BudgetContext } from "./context/BudgetContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BudgetProvider>
    <App />
  </BudgetProvider>
);
