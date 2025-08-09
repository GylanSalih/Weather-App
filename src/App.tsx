// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // global router
import { DesktopHeader } from './components/Header/DesktopHeader'; // global header
import { Footer } from './components/Footer/Footer'; // global footer
import { Moon, Sun } from 'lucide-react'; // lucide icons import
import { Home } from './Pages/Home/Home'; // home page
import { PageOne } from './Pages/PageOne/PageOne';
import { PageTwo } from './Pages/PageTwo/PageTwo';
import { PageThree } from './Pages/PageThree/PageThree';
import styles from './App.module.scss'; // global styles

import './fonts/fonts.css'; // global fonts
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'; // darkmode context

const AppContent: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`${styles.app} ${darkMode ? 'darkMode' : ''}`}>
      <Router>
        <DesktopHeader />

        <button
          className={styles.darkModeButton}
          onClick={toggleDarkMode}
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page-1" element={<PageOne />} />
          <Route path="/page-2" element={<PageTwo />} />
          <Route path="/page-3" element={<PageThree />} />
        </Routes>

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
