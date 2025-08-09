import { Link, useLocation } from 'react-router-dom';
import styles from './DesktopHeader.module.scss';
import { useDarkMode } from '../../contexts/DarkModeContext';

// Header-Komponente für die Navigationsleiste
export const DesktopHeader = () => {
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const logoSrc = darkMode ? '/assets/img/Logo_White.png' : '/assets/img/Logo_Black.png';

  return (
    <div className={`${styles.modal} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          {/* Logo-Bereich - klickbar für Home */}
          <Link to="/" className={styles.logo}>
            <img src={logoSrc} alt="Logo" className={styles.logoImg} />
          </Link>
          <div className={styles.logo}></div>
          {/* Navigation */}
          <nav className={styles.menu}>
            <Link
              to="/page-1"
              className={`${styles.menuButton} ${location.pathname === '/page-1' ? styles.active : ''}`}
            >
              Page 1
            </Link>
            <Link
              to="/page-2"
              className={`${styles.menuButton} ${location.pathname === '/page-2' ? styles.active : ''}`}
            >
              Page 2
            </Link>
            <Link
              to="/page-3"
              className={`${styles.menuButton} ${location.pathname === '/page-3' ? styles.active : ''}`}
            >
              Page 3
            </Link>
          </nav>
        </header>
      </div>
    </div>
  );
};
