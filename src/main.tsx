// Initialisation thème avant React (évite FOUC, compatible CSP extensions)
try {
  const theme = localStorage.getItem("app-froid-theme") || "dark"
  document.documentElement.classList.toggle("dark", theme === "dark")
} catch {
  /* localStorage may be unavailable (private mode, extensions) */
}

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider"
import "./styles/globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="app-froid-theme"
      attribute="class"
      enableSystem={false}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>
)