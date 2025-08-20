// weathercomparetool.tsx
// beeinhaltet die weathercomparetool komponente
// wird von der page alleine geladen

import React, { useEffect, useState } from 'react';
import { Search, Plus, X, Cloud, Sun, CloudRain, Eye, Wind, Droplets, Thermometer, Heart } from 'lucide-react';
import { fetchWeatherData } from '../../api/weather';
import { useDarkMode } from '../../contexts/DarkModeContext';
import styles from './WeatherCompareTool.module.scss';
import { CompareInformation } from './compareInformation/compareInformation';
import CompareSlot from './compareSlots/compareSlots';


// interface definieren für die weatherdata
export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  feelsLike: number;
}

// interface definieren für die compare slot props
// void ist ein typ der keinen wert zurückgibt und ein funktionstyp
interface CompareSlotProps {
  weatherData: WeatherData | null;
  onRemove: () => void;
  index: number;
  setFavorites: (favorites: string[]) => void
}


// state management
// useState ist ein hook der es erlaubt, den state einer komponente zu verwalten
// der state ist der inhalt der komponente
// der state wird mit useState initialisiert
// der state wird mit setState aktualisiert
// der state wird mit useEffect geladen

export const WeatherCompareTool: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  // const [compareSlots, setCompareSlots] = useState<(WeatherData | null)[]>([null, null, null]);
  // vorher waren die nulls vorgespeichert und angegeben und diese werden immer geladen
  const [compareSlots, setCompareSlots] = useState<(WeatherData | null)[]>(() => {
    const saved = localStorage.getItem("compareSlots");
    return saved ? JSON.parse(saved) : [null, null, null];
  });
  // wenn keine daten in localStorage sind, werden die nulls geladen
  // die gespeicherten daten werden aus localStorage geladen und in compareSlots gespeichert

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  }); // so ssollte er die daten vin localStorage laden
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // wenn compareSlots geändert wird, wird der state in localStorage gespeichert
  // lese von compareslots und speichere es in localStorage
  useEffect(() => {
    localStorage.setItem("compareSlots", JSON.stringify(compareSlots));
  }, [compareSlots]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // add to favorites button
  const addToFavorite = (cityName: string) => {
    if (!favorites.includes(cityName)) {
      setFavorites([...favorites, cityName]);
    }
    console.log(favorites);
  };

  const addCityToCompare = async (cityName: string) => {
    if (!cityName.trim()) return;
    
    // wenn die stadt bereits im vergleich vorhanden ist, wird ein error geworfen
    // case sensitive umgehen durch toLowerCase()
    // compareSlots ist ein Array von Objekten.
    // .find() sucht das erste Slot-Objekt, dessen city-Eigenschaft (unabhängig von Groß-/Kleinschreibung) mit cityName übereinstimmt.
    // wenn nichts gefunden wird oder ein null wert vorhanden ist, wird ein error geworfen
    // setzen den Error auf "this city is already being compared" und returnen
    const existingCity = compareSlots.find(slot => 
      slot && slot.city.toLowerCase() === cityName.toLowerCase()
    );
    
    if (existingCity) {
      setError('this city is already being compared');
      return;
    }

    // Find first empty slot
    const emptySlotIndex = compareSlots.findIndex(slot => slot === null);
    if (emptySlotIndex === -1) {
      setError('Maximal 3 cities can be compared');
      return;
    }


    setLoading(true);
    setError('');

    try {
      const apiResponse = await fetchWeatherData(cityName);

      // wetterdaten aus der api in die weatherdata konvertieren
      const weatherData: WeatherData = {
        city: apiResponse.name,
        temperature: apiResponse.main.temp,
        description: apiResponse.weather[0]?.description,
        humidity: apiResponse.main.humidity,
        pressure: apiResponse.main.pressure,
        windSpeed: apiResponse.wind.speed,
        visibility: apiResponse.visibility,
        icon: apiResponse.weather[0]?.icon || '', // nimmt die icon code aus der api und gibt es zurück
        feelsLike: apiResponse.main.feels_like
      };

      const newSlots = [...compareSlots];
      newSlots[emptySlotIndex] = weatherData;
      setCompareSlots(newSlots);
      setSearchTerm('');
    } catch (err) {
      setError('City not found, please try again');
    } finally {
      setLoading(false);
    }
  };

  // der neue slot ist compareSlots mit dem spread operator der
  // alle inhalte von compareSlots "Kopiert" und einfügt
  // und diese werde werden gleich null gesetzt 
  // setze den inhalt des slots auf null also nichts
  // ein arrow funktion 
  const removeCity = (index: number) => {
    const newSlots = [...compareSlots];
    newSlots[index] = null;
    setCompareSlots(newSlots);
  };

// alte schreibweise ohne arrow funktion
// Option 1: Function Declaration (klassisch)
// Option 2: Function Expression (als Variable)
// Option 3: Arrow Function (kurz)

// Option 1: Function Declaration (klassisch)
// function removeCity(index: number) {

// function removeCity(index: number) {
//   const newSlots = [...compareSlots];
//   newSlots[index] = null;
//   setCompareSlots(newSlots);
// }

  const clearAll = () => {
    setCompareSlots([null, null, null]);
    setError('');
  };

  // clear favorites tags button
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  // Formulare (<form>):
  // Standard: Seite wird neu geladen beim Submit
  // Mit preventDefault: Seite bleibt, JavaScript übernimmt die verarbeitung
  // wenn preventDefault nicht verwendet wird, wird die seite neu geladen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCityToCompare(searchTerm);
  };

  const filledSlots = compareSlots.filter(slot => slot !== null);

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Weather Compare</h2>
        <p className={styles.subtitle}>Compare weather in up to 3 cities</p>
      </div>

      {/* ------------------------------------------ Favorite Start ------------------------------------------ */}
      <div className={styles.favoritesContainer}>
        <h3>Use your favorites</h3>
        <div className={styles.tagsContainer}>

          {/* statt statisch tags die favorites tags aus der favorites array anzeigen */}


          {/* sollte damit jetzt eigentlich dynamisch angezeigt werden */}
          {favorites.map((favorite: string) => (
            <div key={favorite} className={styles.favoriteTag}>{favorite}</div>
          ))}
      

           {/* um die tags zu entfernen */}
        {favorites.length > 0 && (
        <div className={styles.favoritesActions}>
          <button 
            className={styles.clearFavoritesButton}
            onClick={clearFavorites}
          >
            Remove the tags
          </button>

          {/* um die anzahl der tags anzuzeigen */}
          <div className={styles.summary}>
            {favorites.length} {favorites.length === 1 ? 'City' : 'Cities'} are in your favorites
          </div>
        </div>
      )}
        </div>
  </div>

      {/* ------------------------------------------ Search Form Start ------------------------------------------ */}
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        {/* search input */}
        <div className={styles.searchInput}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Enter city name (e.g. Berlin, Munich, Hamburg)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          {/* add button */}
          {/* disabled ist true wenn loading oder searchTerm leer ist loading || !searchTerm.trim() */}
          <button 
            type="submit" 
            className={styles.addButton}
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? 'Loading...' : 'Add'}
          </button>
        </div>
      </form>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* ------------------------------------------ Compare Slots Start ------------------------------------------ */}
      {/* mit map 3 slots erstellt */}
      <div className={styles.compareGrid}>
        {compareSlots.map((weatherData, index) => (
          <CompareSlot
            key={index}
            weatherData={weatherData}
            onRemove={() => removeCity(index)}
            index={index}
          />
        ))}
      </div>
    
      {/* ------------------------------------------ Clear All and Summary Start ------------------------------------------ */}
      {/* Clear button */}
      {filledSlots.length > 0 && (
        <div className={styles.actions}>
          <button 
            className={styles.clearButton}
            onClick={clearAll}
          >
            Remove all
          </button>
          <div className={styles.summary}>
            {filledSlots.length} {filledSlots.length === 1 ? 'City' : 'Cities'} are being compared
          </div>
        </div>
      )}
    
      {/* ------------------------------------------ Clear All and Summary Start ------------------------------------------ */}
      {/* Table with the compare information */}

      <CompareInformation filledSlots={filledSlots} />
   
    </div>
  );
};
