import { ReactElement } from "react";
import styles from "./AirConditions.module.scss";
import { Thermometer, Wind, Droplet, Sun } from "lucide-react";
import { AirConditionsSlot } from "./Slots/AirConditionsSlot";
import { WeatherContext } from "../../contexts/weatherProviderContext";
import { useContext } from "react";

export const AirConditions = (): ReactElement => {
  const { airConditions, loading, error } = useContext(WeatherContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className={styles.airConditions}>


        <div className={styles.titleAndButtonParent}>
            <h2 className={styles.title}>Air Conditions</h2>
            <button className={styles.moreInfoButton}>
                Mehr Erfahren
            </button>
        </div>


      <div className={styles.conditionsGrid}>
        <AirConditionsSlot index={0} />
        <AirConditionsSlot index={1} />
        <AirConditionsSlot index={2} />
        <AirConditionsSlot index={3} />
      </div>
    </div>
  );
};
