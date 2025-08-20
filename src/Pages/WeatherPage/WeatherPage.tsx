
import { ReactElement } from "react";
import styles from "./WeatherPage.module.scss";
import { WeatherBanner } from "../../components/WeatherBanner/WeatherBanner";
import { WeatherProvider } from "../../contexts/weatherProviderContext";
import { TodayForecast } from "@/components/TodayForecast/TodayForecast";
import { AirConditions } from "@/components/AirConditions/AirConditions";
import { SevenDayForecast } from "@/components/7DayForecast/7DayForecast";
import { SearchBar } from "@/components/SearchBar/SearchBar";

export const WeatherPage = (): ReactElement => {

  return (
    <div className={styles.containerpage}>

      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>

      <div className={styles.weatherbanner}>
        <WeatherBanner />
      </div>
      
      <div className={styles.todayforecast}>
        <TodayForecast />
      </div>

      <div className={styles.airconditions}>
        <AirConditions />
      </div>

      <div className={styles.sevendayforecast}>
        <SevenDayForecast />
      </div>
      
    </div>  
  );
};