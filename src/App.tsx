// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // global router
import { DesktopHeader } from "./components/Header/DesktopHeader"; // global header
import { WeatherPage } from "./Pages/WeatherPage/WeatherPage";
import { FavoritesPage } from "./Pages/favoritesPage/favoritesPage";
import { ComparePage } from "./Pages/ComparePage/ComparePage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import styles from "./App.module.scss"; // global styles

import "./fonts/fonts.css"; // global fonts
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext"; // darkmode context
import { WeatherProvider } from "./contexts/weatherProviderContext";
import { UserPage } from "./Pages/UserPage/UserPage";

const AppContent: React.FC = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${styles.app} ${darkMode ? styles.darkMode : ""}`}>
      <Router>
        <DesktopHeader />
        <WeatherProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/weather" replace />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </WeatherProvider>
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
