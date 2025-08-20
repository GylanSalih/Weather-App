import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./DesktopHeader.module.scss";
import { useDarkMode } from "../../contexts/DarkModeContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  CloudMoon,
  ChartColumnStacked,
  Map,
  Settings2,
  User,
  Bookmark,
} from "lucide-react";
import { useState } from "react";

// Header-Komponente für die Navigationsleiste
export const DesktopHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const logoSrc = darkMode
    ? "/assets/img/Logo_White.png"
    : "/assets/img/Logo_Black.png";
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);


  // nochmal morgen mir das anschauen damit ich das richtig verstehe und wie es funktioniert
  // Mobile Menu schließen mit Animation durch eine funktion
  const closeMobileMenu = () => {
    setMobileMenuClosing(true);
    setTimeout(() => {
      setShowMobileMenu(false);
      setMobileMenuClosing(false);
    }, 300); // Animation dauert 300ms bis dahin läuft die animation per css
  };

  return (
    <div className={`${styles.modal} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          {/* Logo-Bereich - klickbar für Home */}
          <Link to="/" className={styles.logo}>
            <img src={logoSrc} alt="Logo" className={styles.logoImg} />
          </Link>

          {/* Navigation */}
          <nav className={styles.menu}>
            <Link
              to="/weather"
              className={`${styles.menuButton} ${location.pathname === "/weather" ? styles.active : ""}`}
            >
              Weather
            </Link>
            <Link
              to="/compare"
              className={`${styles.menuButton} ${location.pathname === "/compare" ? styles.active : ""}`}
            >
              Compare
            </Link>
            <Link
              to="/cities"
              className={`${styles.menuButton} ${location.pathname === "/cities" ? styles.active : ""}`}
            >
              Cities
            </Link>
            <Link
              to="/maps"
              className={`${styles.menuButton} ${location.pathname === "/maps" ? styles.active : ""}`}
            >
              Maps
            </Link>
            <Link
              to="/settings"
              className={`${styles.menuButton} ${location.pathname === "/settings" ? styles.active : ""}`}
            >
              Settings
            </Link>

            {/* User-Bereich - klickbar für User-Profil */}
            <Link to="/favorites" className={styles.favoritesIcon}>
              <Bookmark size={28} />
            </Link>

            {/* User-Bereich - klickbar für User-Profil */}
            <Link to="/user" className={styles.userIcon}>
              <User size={28} />
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu size={24} />
          </button>

          {/* Mobile Menu Overlay */}
          {showMobileMenu && (
            <div
              className={`${styles.mobileMenuOverlay} ${mobileMenuClosing ? styles.mobileMenuOverlayClosing : ""}`}
              onClick={closeMobileMenu}
            >
              <div
                className={`${styles.mobileMenu} ${mobileMenuClosing ? styles.mobileMenuClosing : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Menu Header */}
                <div className={styles.mobileMenuHeader}>
                  <h2 className={styles.mobileMenuTitle}>Weather App</h2>
                  <button
                    className={styles.mobileMenuClose}
                    onClick={closeMobileMenu}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* ------------------------------------------ Mobile Menu Start ------------------------------------------ */}
                {/* Weather Button */}
                <button
                  className={styles.mobileSettingsButton}
                  onClick={() => {
                    navigate("/weather");
                    closeMobileMenu();
                  }}
                >
                  <CloudMoon size={20} />
                  Weather
                </button>

                {/* Compare Button */}
                <button
                  className={styles.mobileSettingsButton}
                  onClick={() => {
                    navigate("/compare");
                    closeMobileMenu();
                  }}
                >
                  <ChartColumnStacked size={20} />
                  Compare
                </button>

                {/* Cities Button */}
                <button
                  className={styles.mobileSettingsButton}
                  onClick={() => {
                    navigate("/cities");
                    closeMobileMenu();
                  }}
                >
                  <Map size={20} />
                  Cities
                </button>

                {/* Maps Button */}
                <button
                  className={styles.mobileSettingsButton}
                  onClick={() => {
                    navigate("/maps");
                    closeMobileMenu();
                  }}
                >
                  <Map size={20} />
                  Maps
                </button>

                {/* Settings Button */}
                <button
                  className={styles.mobileSettingsButton}
                  onClick={() => {
                    navigate("/settings");
                    closeMobileMenu();
                  }}
                >
                  <Settings2 size={20} />
                  Settings
                </button>

                {/* Dark Mode Button */}
                <button
                  className={styles.mobileDarkModeButton}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          )}
          {/* ------------------------------------------ Mobile Menu End ------------------------------------------ */}
        </header>
      </div>
    </div>
  );
};
