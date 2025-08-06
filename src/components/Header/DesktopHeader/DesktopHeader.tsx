import { Link, useLocation } from 'react-router-dom';
import styles from './DesktopHeader.module.scss';

// Header-Komponente für die Navigationsleiste
export const DesktopHeader = () => {
  const location = useLocation();

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        {/* Logo-Bereich */}logoImglogoImg
        <div className={styles.logo}>
          <img
            src="/assets/img/logo.png" // Pfad zu deinem Logo-Bild
            alt="Logo"
            className={styles.logoImg}
          />
        </div>
        {/* Navigationsmenü */}
        <nav className={styles.menu}>
          {/* Link zur Vergleich-Seite, hebt sich hervor wenn aktiv */}
          <Link
            to="/"
            className={`${styles.menuButton} ${location.pathname === '/' ? styles.active : ''}`}
          >
            Vergleich
          </Link>
          {/* Link zur Standorte-Seite, hebt sich hervor wenn aktiv */}
          <Link
            to="/standorte"
            className={`${styles.menuButton} ${location.pathname === '/standorte' ? styles.active : ''}`}
          >
            Standorte
          </Link>
          {/* Link zur Impressum-Seite, hebt sich hervor wenn aktiv */}
          <Link
            to="/impressum"
            className={`${styles.menuButton} ${location.pathname === '/impressum' ? styles.active : ''}`}
          >
            Impressum
          </Link>
        </nav>
      </header>
    </div>
  );
};
