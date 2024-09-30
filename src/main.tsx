import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FormFieldsProvider } from "./context/FormFieldsContext/FormFieldsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormFieldsProvider>
      <App />
    </FormFieldsProvider>
  </StrictMode>
);
