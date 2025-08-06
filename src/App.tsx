// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DesktopHeader } from './components/Header/DesktopHeader/DesktopHeader';
import { Footer } from './components/Footer/Footer';
import { MainContent } from './components/MainContent';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <DesktopHeader />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/standorte" element={<div>Standorte Seite</div>} />
          <Route path="/impressum" element={<div>Impressum Seite</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
