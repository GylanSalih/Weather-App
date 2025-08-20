// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // global router
import { DesktopHeader } from "./components/Header/DesktopHeader"; // global header
import { Footer } from "./components/Footer/Footer"; // global footer
import {
  Menu,
  Moon,
  Sun,
  X,
  Calendar,
  BarChart3,
  Gift,
  Settings,
} from "lucide-react"; // lucide icons import
import { Home } from "./Pages/Home/Home"; // home page
import { WeatherPage } from "./Pages/WeatherPage/WeatherPage";
import { FavoritesPage } from "./Pages/FavoritesPage/FavoritesPage";
import { MapsPage } from "./Pages/MapPage/MapPage";
import { ComparePage } from "./Pages/ComparePage/ComparePage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import styles from "./App.module.scss"; // global styles

import "./fonts/fonts.css"; // global fonts
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext"; // darkmode context
import { WeatherProvider } from "./contexts/weatherProviderContext";
import { UserPage } from "./Pages/UserPage/UserPage";
import { CitiesPage } from "./Pages/CitiesPage/CitiesPage";

const AppContent: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`${styles.app} ${darkMode ? "darkMode" : ""}`}>
      <Router>
        <DesktopHeader />
        <WeatherProvider>
          <button
            className={styles.darkModeButton}
            onClick={toggleDarkMode}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </WeatherProvider>

        <Footer />
      </Router>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
};

export default App;
