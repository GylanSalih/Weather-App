import { ReactElement } from "react";
import styles from "./WeatherBanner.module.scss";
import { WeatherContext } from "../../contexts/weatherProviderContext";
import { useContext } from "react";
import { getWeatherDescription, getWeatherImage } from "@/Utils/weatherDataToImg";

export const WeatherBanner = (): ReactElement => {
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) {
    return <div>Weather context not available</div>;
  }

  const { current, loading, error } = weatherContext;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!current) return <div>No current weather data available</div>;

  return (
    <div className={styles.weatherBanner}>
      <div className={styles.bannerContent}>
        <div className={styles.contentLeft}>
          <h2 className={styles.title}>{current.city}</h2>
          <p className={styles.description}>
            Wind: {current.windspeed} m/s, {current.winddirection}°
          </p>
          <p className={styles.temperature}>{current.temperature}°C</p>
          <p className={styles.rain}>Niederschlag: {current.precipitation_sum}mm</p>
          <p className={styles.description}>{getWeatherDescription(current)}</p>
          <p className={styles.smallinfo}>Trondheim, Cali, Köln</p>
        </div>

        <div className={styles.contentRight}>
          <img className={styles.image} src={getWeatherImage(current)} />
        </div>
      </div>
    </div>
  );
};
