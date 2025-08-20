import React from 'react';
import { Search, Filter } from 'lucide-react';
import styles from './filterbar.module.scss';

interface rainWeather {
  rain: 'y' | 'n';
  snow: 'y' | 'n';
}

interface warmWeather {
  sunny: 'y' | 'n';
  cloudy: 'y' | 'n';
  foggy: 'y' | 'n';
}

interface coldWeather {
  wind: 'y' | 'n';
  snow: 'y' | 'n';
  sleet: 'y' | 'n';
}

interface FilterbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  selectedBurgerTypes: rainWeather;
  selectedFriesTypes: warmWeather;
  selectedDrinkTypes: coldWeather;
  handleRainWeatherChange: (type: string) => void;
  handleWarmWeatherChange: (type: string) => void;
  handleColdWeatherChange: (type: string) => void;
  clearFilters: () => void;
  cities: string[];
}

export const Filterbar: React.FC<FilterbarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  minRating,
  setMinRating,
  selectedRainWeather,
  selectedWarmWeather,
  selectedColdWeather,
  handleRainWeatherChange,
  handleWarmWeatherChange,
  handleColdWeatherChange,
  clearFilters,
  cities,
}) => {
  return (
    <div className={styles.filtersSection}>
      <div className={styles.searchBox}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Restaurant oder Stadt suchen..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Stadt:</label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className={styles.select}
          >
            <option value="">Alle Städte</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Mindestbewertung:</label>
          <select
            value={minRating}
            onChange={e => setMinRating(Number(e.target.value))}
            className={styles.select}
          >
            <option value={0}>Alle Bewertungen</option>
            <option value={1}>1+ Sterne</option>
            <option value={2}>2+ Sterne</option>
            <option value={3}>3+ Sterne</option>
            <option value={4}>4+ Sterne</option>
            <option value={5}>5 Sterne</option>
          </select>
        </div>
        <div className={styles.burgerTypeFilters}>
          <label>Burger-Typen:</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBurgerTypes.classic || false}
                onChange={() => handleBurgerTypeChange('classic')}
              />
              Classic
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBurgerTypes.cheese || false}
                onChange={() => handleBurgerTypeChange('cheese')}
              />
              Cheese
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBurgerTypes.bio || false}
                onChange={() => handleBurgerTypeChange('bio')}
              />
              Bio
            </label>
          </div>
        </div>
        <button onClick={clearFilters} className={styles.clearBtn}>
          <Filter size={16} />
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
};
