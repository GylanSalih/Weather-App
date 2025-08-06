// Footer.tsx
import React from 'react';
import styles from './footer.module.scss'; // ✅ Korrekter Import

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2024 BV24 TypeScript React. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};
