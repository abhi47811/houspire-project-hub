import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initErrorTracking } from "./lib/error-tracking";

// Initialize error tracking before app renders
initErrorTracking();

createRoot(document.getElementById("root")!).render(<App />);
