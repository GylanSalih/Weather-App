import React from 'react';
import styles from './MainContent/MainContent.module.scss';

export const MainContent: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.contentContainer}>
        <h2>React + TypeScript + SASS</h2>
        <p>
          Dies ist eine einfache React + TypeScript Anwendung mit einer sauberen
          Struktur.
        </p>
        <p>Du kannst hier deine eigenen Komponenten und Features hinzufügen.</p>
      </div>
    </main>
  );
};
