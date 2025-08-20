import { ReactElement } from "react";
import styles from './CompareInformation.module.scss'


// nimm das interface aus der weathercomparetool.tsx
// aus dem parent component
import { WeatherData } from "../WeatherCompareTool";
interface compareInformationProps {
    filledSlots: WeatherData[];
}

export const CompareInformation = ({ filledSlots }: compareInformationProps): ReactElement => {
  return (
        <div>

      {/* ------------------------------------------ Compare Overview Start ------------------------------------------ */}  
      {filledSlots.length >= 2 && (
        <div className={styles.comparison}>
          <h3>Comparison Overview</h3>
          <div className={styles.comparisonTable}>

            <div className={styles.comparisonRow}>
              <span className={styles.label}>Warmest City:</span>
              <span className={styles.value}>
                {(() => {
                  const warmest = filledSlots.reduce((warmest: WeatherData, city: WeatherData) => 
                    city && warmest && city.temperature > warmest.temperature ? city : warmest
                  );
                  return warmest ? `${warmest.city} (${Math.round(warmest.temperature)}°C)` : 'None';
                })()}
              </span>
            </div>

            <div className={styles.comparisonRow}>
              <span className={styles.label}>Coldest City:</span>
              <span className={styles.value}>
                {(() => {
                  const coldest = filledSlots.reduce((coldest: WeatherData, city: WeatherData) => 
                    city && coldest && city.temperature < coldest.temperature ? city : coldest
                  );
                  return coldest ? `${coldest.city} (${Math.round(coldest.temperature)}°C)` : 'None';
                })()}
              </span>
            </div>

            <div className={styles.comparisonRow}>
              <span className={styles.label}>Highest Humidity:</span>
              <span className={styles.value}>
                {(() => {
                  const highest = filledSlots.reduce((highest: WeatherData, city: WeatherData) => 
                    city && highest && city.humidity > highest.humidity ? city : highest
                  );
                  return highest ? `${highest.city} (${highest.humidity}%)` : 'None';
                })()}
              </span>
            </div>

            <div className={styles.comparisonRow}>
              <span className={styles.label}>Strongest Wind:</span>
              <span className={styles.value}>
                {(() => {
                  const windiest = filledSlots.reduce((windiest: WeatherData, city: WeatherData) => 
                    city && windiest && city.windSpeed > windiest.windSpeed ? city : windiest
                  );
                  return windiest ? `${windiest.city} (${windiest.windSpeed} m/s)` : 'None';
                })()}
              </span>
            </div>

            <div className={styles.comparisonRow}>
              <span className={styles.label}>Lowest Wind:</span>
              <span className={styles.value}>
                {(() => {
                  const windest = filledSlots.reduce((windest: WeatherData, city: WeatherData) => 
                    city && windest && city.windSpeed < windest.windSpeed ? city : windest
                  );
                  return windest ? `${windest.city} (${windest.windSpeed} m/s)` : 'None';
                })()}
              </span>
            </div>

            <div className={styles.comparisonRow}>
              <span className={styles.label}> Lowest Temperature by Feeling:</span>
              <span className={styles.value}>
                {(() => {
                  const feelsLike = filledSlots.reduce((feelsLike: WeatherData, city: WeatherData) => 
                    city && feelsLike && city.feelsLike < feelsLike.feelsLike ? city : feelsLike
                  );
                  return feelsLike ? `${feelsLike.city} (${feelsLike.feelsLike}°C)` : 'None';   // gibt die stadt und die gefühlte temperatur zurück
                })()}
              </span>
            </div>

              <div className={styles.comparisonRow}>
                <span className={styles.label}> Highest Temperature by Feeling:</span>
                <span className={styles.value}>
                  {(() => {
                    const feelsLike = filledSlots.reduce((feelsLike: WeatherData, city: WeatherData) => 
                      city && feelsLike && city.feelsLike > feelsLike.feelsLike ? city : feelsLike
                    );
                    return feelsLike ? `${feelsLike.city} (${feelsLike.feelsLike}°C)` : 'None';   // gibt die stadt und die gefühlte temperatur zurück
                  })()}
                </span>
              </div>
              

            </div>
          </div>
        )}
        {/* ------------------------------------------ Compare Overview End ------------------------------------------ */}
    </div>
  );
};