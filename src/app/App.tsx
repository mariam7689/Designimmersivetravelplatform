import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./components/HomePage";
import { ExplorePage } from "./components/ExplorePage";
import { TripPlannerPage } from "./components/TripPlannerPage";
import { HiddenGemsPage } from "./components/HiddenGemsPage";
import { StaysPage } from "./components/StaysPage";
import { ActivitiesPage } from "./components/ActivitiesPage";
import { DesertDetailsPage } from "./components/DesertDetailsPage";

function AppContent({ darkMode, toggleDarkMode, isLoading, setIsLoading }: {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}) {
  const location = useLocation();
  const showFAB = location.pathname !== "/plan";

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <div className="min-h-screen bg-background text-foreground">
          <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/plan" element={<TripPlannerPage />} />
            <Route path="/hidden-gems" element={<HiddenGemsPage />} />
            <Route path="/stays" element={<StaysPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/desert/:id" element={<DesertDetailsPage />} />
          </Routes>
          <Footer />
          {showFAB && <FloatingActionButton />}
        </div>
      )}
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <BrowserRouter>
      <AppContent
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </BrowserRouter>
  );
}