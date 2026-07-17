import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

if (import.meta.env.PROD && container.dataset.ssg === "true") {
  hydrateRoot(
    container,
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} else {
  createRoot(container).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
