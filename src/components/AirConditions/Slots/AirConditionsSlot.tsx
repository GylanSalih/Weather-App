import React, { ReactElement } from "react";
import styles from "./AirConditionsSlot.module.scss";
import { Wind, Droplet, Sun, Thermometer, Moon } from "lucide-react";
import { WeatherContext } from "../../../contexts/weatherProviderContext";
import { useContext } from "react";

// erlaubt die daten zu übergeben
// damit AirConditionsSlot diese werte selbst reinschreiben kann

// warum benutzue ich React.cloneElement? ich überschreibe die className des icons
export const AirConditionsSlot = (props: { index: number }): ReactElement => {
  const titles = [
    "Real Feel:",
    "Wind:",
    "Chance of Rain:",
    "Sunrise / Sunset:",
    "UV Index:",
  ];

  const icons = [
    <Thermometer className={styles.lucideIcon} />,
    <Wind className={styles.lucideIcon} />,
    <Droplet className={styles.lucideIcon} />,
    null, // placeholder für sunrise/sunset icon
  ];

  const { airConditions, loading, error } = useContext(WeatherContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  // bedingte rendering für die icons
  let iconToRender;
  if (props.index === 3) {
    iconToRender =
    airConditions?.is_day === 1 ? (
        <Sun className={styles.lucideIcon} />
      ) : (
        <Moon className={styles.lucideIcon} />
      );
  } else {
    iconToRender = icons[props.index];
  }

  // bedingte rendering für die titel
  let textToRender;
  if (props.index === 3) {
    textToRender = airConditions?.is_day === 1 ? "Sunrise" : "Sunset";
  } else {
    textToRender = titles[props.index];
  }

  // bedingte rendering für die dark and sun texte
  let valueToRender;
  if (props.index === 0) {
    valueToRender = `${airConditions?.temperature}°C`;
  } else if (props.index === 1) {
    valueToRender = `${airConditions?.windspeed} m/s`;
  } else if (props.index === 2) {
    valueToRender = `${airConditions?.rain_sum} mm`;
  } else if (props.index === 3) {
    valueToRender = airConditions?.is_day === 1 ? "Day Time" : "Night Time";
  } else {
    valueToRender = "N/A";
  }






  // ------------------------------------------------------------
  // 1 = day
  // 0 = night
  // ------------------------------------------------------------

  return (
    <div className={styles.itemBox}>
      <div className={styles.titleAndIcon}>
        {iconToRender}
        <h2 className={styles.title}>{textToRender}</h2>
      </div>

      <div className={styles.valueContainer}>
        <p className={styles.textValue}>{valueToRender}</p>
      </div>
    </div>
  );
};
