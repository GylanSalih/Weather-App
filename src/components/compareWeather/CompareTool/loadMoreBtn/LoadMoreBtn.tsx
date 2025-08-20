import { useState } from 'react';
import { CloudDownload } from 'lucide-react';

// Styles
import styles from './LoadMoreBtn.module.scss';

// 1. Interface definieren
interface LoadMoreBtnProps {
  visibleCount: number;
  setVisibleCount: (value: number | ((prev: number) => number)) => void;
  totalCount: number;
}

// 2. Props in der Komponente verwenden
export const LoadMoreBtn = ({ visibleCount, setVisibleCount, totalCount }: LoadMoreBtnProps) => {
  return (
    <div>
      {visibleCount < totalCount && (
        <button
          className={styles.loadMore}
          onClick={() => setVisibleCount(prev => prev + 3)}
        >
          Weitere laden Eigene Komponente ({totalCount - visibleCount} weitere)
          <CloudDownload size={20} />
        </button>
      )}
    </div>
  );
};