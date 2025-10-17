import { ReactElement } from 'react';
import styles from './TodayForecast.module.scss';
import { Droplet } from 'lucide-react';
import { WeatherContext } from '../../contexts/weatherProviderContext';
import { useContext } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

import { getWeatherDescription, getWeatherImage } from '@/Utils/weatherDataToImgTodayForecast';

export const TodayForecast = (): ReactElement => {
  const context = useContext(WeatherContext);
  const { darkMode } = useDarkMode();
  
  if (!context) {
    return <div>Weather context not available</div>;
  }
  
  const { hourly, loading, error } = context;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hourly) return <div>No hourly data available</div>;

  const boxRepeat = Array.from({ length: 6 });
  return <div className={`${styles.todayForecast} ${darkMode ? styles.darkMode : ''}`}>
    <div className={styles.forecastTitle}>
        <h2 className={`${styles.title} ${darkMode ? styles.darkMode : ''}`}>Today's Forecast</h2>
    </div>
    <div className={styles.forecastContent}>
      {boxRepeat.map((_, index) => (
        <div key={index} className={`${styles.item} ${darkMode ? styles.darkMode : ''}`}>
          

          {/* <h3 className={styles.time}>{dateToTime(new Date(hourly?.time[index]))} Uhr</h3> */}
          <p className={`${styles.description} ${darkMode ? styles.darkMode : ''}`}>{getWeatherDescription(hourly, index)}</p>
          <img src={getWeatherImage(hourly, index)} alt="weather" className={styles.image}/>
          <div className={`${styles.flexContainer} ${darkMode ? styles.darkMode : ''}`}>
            <p className={`${styles.rainprobability} ${darkMode ? styles.darkMode : ''}`}>{hourly?.precipitation_probability[index]}%</p>
            <Droplet className={`${styles.rainDropIcon} ${darkMode ? styles.darkMode : ''}`} />
          </div>
          <p className={`${styles.temperature} ${darkMode ? styles.darkMode : ''}`}>{hourly?.temperature_2m_hourly[index]}°C</p>
        </div>
      ))}
    </div>
  </div>;
};