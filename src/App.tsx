import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import ErrorBoundary from "@/components/ErrorBoundary"
import HomePage from "@/features/home/HomePage"
import DespPage from "@/features/desp/DespPage"
import AzotePage from "@/features/azote/AzotePage"
import CapteurSignalPage from "@/features/capteur-signal/CapteurSignalPage"
import CalculDiamPage from "@/features/calcul-diam/CalculDiamPage"
import AirDataPage from "@/features/air-data/AirDataPage"
import RulerPage from "@/features/ruler/RulerPage"
import SimplePage from "@/features/simple/SimplePage"
import SettingsPage from "@/features/settings/SettingsPage"

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex h-full flex-col">
          <a
            href="#main-content"
            className="absolute -top-full left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md transition-[top] duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Aller au contenu principal
          </a>
          <Header />
          <main
            id="main-content"
            className="flex flex-1 flex-col overflow-y-auto px-2 py-2 scroll-mt-4"
            tabIndex={-1}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/desp" element={<DespPage />} />
              <Route path="/azote" element={<AzotePage />} />
              <Route path="/capteur-signal" element={<CapteurSignalPage />} />
              <Route path="/calcul-diam" element={<CalculDiamPage />} />
              <Route path="/air-data" element={<AirDataPage />} />
              <Route path="/ruler" element={<RulerPage />} />
              <Route path="/simple" element={<SimplePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
