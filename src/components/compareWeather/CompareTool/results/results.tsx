import React from 'react';
import { useState } from 'react';
import styles from './results.module.scss';
import { WeatherContext } from '@/contexts/weatherProviderContext';

// 1. Interface definieren
interface ResultsProps {
  displayedWeathers: Weather[];
  totalCount: number;
  comparisonMode: boolean;
  onStartComparison: () => void;
}

// 2. Props in der Komponente verwenden
export const Results = ({
  displayedWeathers,
  totalCount,
  comparisonMode,
  onStartComparison,
}: ResultsProps) => {
  return (
    <div className={styles.container}>
      {/* Results Header */}
      <div className={styles.resultsHeader}>
        <div className={styles.resultsInfo}>
          <span>
            {displayedWeathers.length} von {totalCount} Städten gefunden
          </span>

          {/* No Results Message */}
          {displayedWeathers.length === 0 && (
            <div className={styles.noResults}>
              <p>
                Keine Wetterdaten gefunden. Versuche andere Filtereinstellungen.
              </p>
            </div>
          )}
        </div>

        {!comparisonMode && (
          <button
            onClick={onStartComparison}
            className={styles.startComparisonBtn}
          >
            Vergleich starten
          </button>
        )}
      </div>
    </div>
  );
};
