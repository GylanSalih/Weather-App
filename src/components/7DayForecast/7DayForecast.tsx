import { ReactElement } from "react";
import styles from "./7DayForecast.module.scss";
import { WeatherContext } from "../../contexts/weatherProviderContext";
import { useContext } from "react";
import { getNextSevenDays } from "@/Utils/dateUtils";
import { getWeatherImage, getWeatherDescription } from "@/Utils/weatherDataToImg7DayForecast";
import { useDarkMode } from "../../contexts/DarkModeContext";
export const SevenDayForecast = (): ReactElement => {
  const context = useContext(WeatherContext);
  const { darkMode } = useDarkMode();
  
  if (!context) {
    return <div>Weather context not available</div>;
  }
  
  const { daily, loading, error } = context;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!daily) return <div>No data available</div>;

 // erstellt ein array mit 7 leeren boxes
  const boxRepeat = Array.from({ length: 7 });

  return (
    <div className={`${styles.sevenDayForecast} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.forecastTitle}>
        <h2 className={`${styles.title} ${darkMode ? styles.darkMode : ''}`}>7 Day Forecast</h2>
      </div>
      {boxRepeat.map((_, index) => (
        <div key={index} className={styles.forecastContent}>
          <div className={`${styles.item} ${darkMode ? styles.darkMode : ''}`}>
            <h3 className={`${styles.day} ${darkMode ? styles.darkMode : ''}`}>{getNextSevenDays()[index] || `Tag ${index + 1}`}</h3>
            <img src={getWeatherImage(daily, index)} alt="weather" className={styles.image} />
            <h3 className={`${styles.weathertext} ${darkMode ? styles.darkMode : ''}`}>{getWeatherDescription(daily, index)}</h3>
          <p className={`${styles.temperature} ${darkMode ? styles.darkMode : ''}`}>{daily?.temperature_2m_max?.[index] ?? 0}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
};



