import { useDarkMode } from "../../../contexts/DarkModeContext";
import { useState } from "react";
import styles from "./compareSlots.module.scss";
import { Plus } from "lucide-react";
import { Cloud, CloudRain, Droplets, Eye, Sun, Thermometer, Wind } from "lucide-react";
import { Heart } from "lucide-react";
import { X } from "lucide-react";
import { WeatherData } from "../WeatherCompareTool";


interface compareSlotProps {
    weatherData: WeatherData | null;
    onRemove: () => void;
    index: number;
}

// compare slot komponente
const compareSlot: React.FC<compareSlotProps> = ({ weatherData, onRemove, index }) => {
    const { darkMode } = useDarkMode();
    // favorites state definieren
    const [favorites, setFavorites] = useState<string[]>([]);
    
    // wenn keine wetterdaten vorhanden sind, zeige einen plus icon und einen text "add city {index + 1}"
    if (!weatherData) {
      return (
        <div className={`${styles.compareSlot} ${styles.empty} ${darkMode ? styles.dark : ''}`}>
          <div className={styles.emptyContent}>
            <Plus size={32} className={styles.plusIcon} />
            <p>Add City {index + 1}</p>
          </div>
        </div>
      );
    }
  
    // die gespeicherten und verarbeiteten daten von weather.tsx welches diese als 01,02,03d verarbeitet wird hier wieder verarbeitet und als icon angezeigt
    // WMO (World Meteorological Organization) Wettercodes
    // der icon code kommt aus der api
    // wenn wetterdaten vorhanden sind, zeige die passenden icons anhand der icon code
    // includes ist eine funktion die prüft ob ein string in einem anderen string enthalten ist
    // includes = ist die 01 in iconCode enthalten dann gib zurück sun icon
    const getWeatherIcon = (iconCode: string) => {
      if (iconCode.includes('01')) return <Sun size={32} className={styles.weatherIcon} />;
      if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
        return <Cloud size={32} className={styles.weatherIcon} />;
      if (iconCode.includes('09') || iconCode.includes('10')) 
        return <CloudRain size={32} className={styles.weatherIcon} />;
      return <Sun size={32} className={styles.weatherIcon} />;
    };
  
      // add to favorites button
      const onAddToFavorites = (id: string) => {
        if (!favorites.includes(id)) setFavorites([...favorites, id]);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(id);
      };
  
    return (
      <div className={`${styles.compareSlot} ${styles.filled} ${darkMode ? styles.dark : ''}`}>
  
        <div className={styles.buttonContainer}>
          <button className={styles.removeButton} onClick={onRemove}>
            <X size={16} />
          </button>
  
          <button className={styles.addToFavoritesButton} onClick={() => onAddToFavorites(weatherData.city)}>
            {/* wenn die stadt im favorites array ist, dann fülle den heart mit der farbe der stadt */}
            <Heart size={16} className={styles.heartIcon} fill={favorites.includes(weatherData.city) ? 'currentColor' : 'none'} />
          </button>
        </div>
  
        
        <div className={styles.cityHeader}>
          <h3>{weatherData.city}</h3>
          {getWeatherIcon(weatherData.icon)}
        </div>
        
        <div className={styles.mainTemp}>
          <span className={styles.temperature}>{Math.round(weatherData.temperature)}°C</span>
          {weatherData.description && !/^\d+$/.test(String(weatherData.description)) && (
            <span className={styles.description}>{weatherData.description}</span>
          )}
        </div>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Thermometer size={16} />
            <span>Gefühlt: {Math.round(weatherData.feelsLike)}°C</span>
          </div>
          <div className={styles.detailItem}>
            <Droplets size={16} />
            <span>Luftfeuchtigkeit: {weatherData.humidity}%</span>
          </div>
          <div className={styles.detailItem}>
            <Wind size={16} />
            <span>Wind: {weatherData.windSpeed} m/s</span>
          </div>
          <div className={styles.detailItem}>
            <Eye size={16} />
            <span>Sicht: {(weatherData.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
      </div>
    );
  };

  export default compareSlot;