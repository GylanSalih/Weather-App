
import { ReactElement } from "react";
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, MapPin, BarChart3 } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import styles from "./ComparePage.module.scss";
import { WeatherCompareTool } from "../../components/WeatherCompare/WeatherCompareTool";

export const ComparePage = (): ReactElement => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${styles.weatherCompare} ${darkMode ? styles.dark : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1>Weather Comparison</h1>
        <p>Compare weather conditions across multiple cities</p>
      </div>

      {/* Features Overview */}
      <div className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <Thermometer size={24} />
          <div className={styles.featureContent}>
            <h3>Temperature Analysis</h3>
            <p>Compare temperatures, feels like, and trends</p>
          </div>
        </div>
        
        <div className={styles.featureCard}>
          <Wind size={24} />
          <div className={styles.featureContent}>
            <h3>Wind & Conditions</h3>
            <p>Analyze wind speed, humidity, and visibility</p>
          </div>
        </div>
        
        <div className={styles.featureCard}>
          <MapPin size={24} />
          <div className={styles.featureContent}>
            <h3>Multi-City View</h3>
            <p>Compare up to 3 cities side by side</p>
          </div>
        </div>
        
        <div className={styles.featureCard}>
          <BarChart3 size={24} />
          <div className={styles.featureContent}>
            <h3>Detailed Insights</h3>
            <p>Get comprehensive weather comparisons</p>
          </div>
        </div>
      </div>

      {/* Main Comparison Tool */}
      <div className={styles.comparisonSection}>
        <WeatherCompareTool />
      </div>
    </div>
  );
};