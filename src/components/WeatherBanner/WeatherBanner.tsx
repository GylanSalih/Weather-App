import { ReactElement } from "react";
import styles from "./WeatherBanner.module.scss";
import { WeatherContext } from "../../contexts/weatherProviderContext";
import { useContext } from "react";
import { getWeatherDescription, getWeatherImage } from "@/Utils/weatherDataToImg";
import { useDarkMode } from "../../contexts/DarkModeContext";

export const WeatherBanner = (): ReactElement => {
  const weatherContext = useContext(WeatherContext);
  const { darkMode } = useDarkMode();

  if (!weatherContext) {
    return <div>Weather context not available</div>;
  }

  const { current, loading, error } = weatherContext;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!current) return <div>No current weather data available</div>;

  return (
    <div className={`${styles.weatherBanner} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.bannerContent}>
        <div className={styles.contentLeft}>
          <h2 className={`${styles.title} ${darkMode ? styles.darkMode : ''}`}>{current.city}</h2>
          <p className={`${styles.description} ${darkMode ? styles.darkMode : ''}`}>
            Wind: {current.windspeed} m/s, {current.winddirection}°
          </p>
          <p className={`${styles.temperature} ${darkMode ? styles.darkMode : ''}`}>{current.temperature}°C</p>
          <p className={`${styles.rain} ${darkMode ? styles.darkMode : ''}`}>Niederschlag: {current.precipitation_sum}mm</p>
          <p className={`${styles.description} ${darkMode ? styles.darkMode : ''}`}>{getWeatherDescription(current)}</p>
          <p className={`${styles.smallinfo} ${darkMode ? styles.darkMode : ''}`}>Trondheim, Cali, Köln</p>
        </div>

        <div className={styles.contentRight}>
          <img className={styles.image} src={getWeatherImage(current)} />
        </div>
      </div>
    </div>
  );
};
