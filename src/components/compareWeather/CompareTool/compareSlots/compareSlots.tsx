import React from 'react';
import styles from './compareSlots.module.scss';
import { X } from 'lucide-react';

// 1. Interface definieren
interface CompareSlotsProps {
  selectedWeathers: Restaurant[];
  comparisonMode: boolean;
  setselectedWeathers: (restaurants: Restaurant[]) => void;
  cancelComparison: () => void;
  compareNow: () => void;
}

// Interface für die Wetterdaten
interface Weather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  time: string;
  is_day: number;
  relative_humidity_2m: number;
  precipitation_sum: number;
  cloudcover: number;
  visibility: number;
  city: string;
}


const ComparisonSlot: React.FC<{ index: number; restaurant: Restaurant | undefined; onRemove: (index: number) => void }> = ({ index, restaurant, onRemove }) => (
  <div className={styles.comparisonSlot}>
    {restaurant ? (
      <div className={`${styles.comparisonCard} ${styles.cardFilled}`}>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(index)}
          title="Restaurant entfernen"
        >
          <X size={16} />
        </button>
        <h4>{restaurant.name}</h4>
        <div className={styles.comparisonDetails}>
          <p>Bewertung: {restaurant.rating}/5</p>
          <p>Stadt: {restaurant.city}</p>
        </div>
      </div>
    ) : (
      <div className={styles.placeholderCard}>
        <img
          src="/assets/img/placeholder.jpg"
          alt="Placeholder"
          className={styles.placeholderImage}
        />
        <p>Restaurant {index + 1} auswählen</p>
      </div>
    )}
  </div>
);

export const CompareSlots = ({
  selectedWeathers,
  comparisonMode,
  setselectedWeathers,
  cancelComparison,
  compareNow,
}: CompareSlotsProps) => {
  const removeRestaurantFromSlot = (index: number): void => {
    setselectedWeathers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {comparisonMode && (
        <div className={styles.comparisonArea}>
          <div className={styles.comparisonHeader}>
            <h3>
              Füge bis zu drei Läden zum vergleich hinzu, <br /> um den besten
              Burger zu finden ({selectedWeathers.length}/3)
            </h3>

            <div className={styles.comparisonButtons}>
              <button onClick={cancelComparison} className={styles.cancelBtn}>
                Abbrechen
              </button>
              <button
                onClick={compareNow}
                className={`${styles.compareBtn} ${selectedWeathers.length >= 2 ? styles.compareBtnActive : ''}`}
                disabled={selectedWeathers.length < 2}
              >
                Jetzt vergleichen ({selectedWeathers.length})
              </button>
            </div>
          </div>

          {/* Comparison Slots */}
          <div className={styles.comparisonGrid}>
            {Array.from({ length: 3 }, (_, index) => (
              <ComparisonSlot
                key={index}
                index={index}
                restaurant={selectedWeathers[index]}
                onRemove={removeRestaurantFromSlot}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
